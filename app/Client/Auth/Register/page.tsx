"use client";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AlertMessage from "../../Components/Alert/page";
import { useRouter } from "next/navigation";
import api from "@/app/api/axios/api";
import Navbar from "../../Components/Navbar/page";
import ProgressLoad from "../../Components/ProgressLoad/page";
function Register() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  interface alertType {
    open: boolean;
    message: string;
    type: "success" | "error" | "warning" | "info";
  }

  const alert: alertType = {
    open: false,
    message: "",
    type: "info",
  };

  const [alertData, setAlertData] = useState(alert);

  const register = async () => {
    try {
      setLoading(true);

      if (email.trim() === "" || !email) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Email Required",
          type: "error",
        });
        return;
      }

      if (password.trim() === "" || !password) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Password Required",
          type: "error",
        });
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{3,}$/;

      if (!emailRegex.test(email)) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Invalid Email",
          type: "error",
        });
        return;
      }

      const passwordstrict = 4;

      if (password.length < passwordstrict) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Password must be atleast 4 characters",
          type: "error",
        });
        return;
      }

      interface bodyType {
        email: string;
        password: string;
      }

      const body: bodyType = {
        email: email,
        password: password,
      };

      const response = await api.post("/api/auth/register", body, {
        withCredentials: true,
      });

      if (response) {
        setAlertData({
          open: true,
          message: response.data.msg || "Registered Successfully",
          type: "success",
        });
        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setLoading(false);
        setAlertData({
          open: true,
          message: err.response?.data.msg || "Something Went Wrong",
          type: "error",
        });
        console.log(err.response?.data?.msg || err.message);
      } else {
        setLoading(false);
        setAlertData({
          open: true,
          message: (err as Error).message,
          type: "error",
        });
        console.log((err as Error).message);
      }
    }
  };

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <Navbar Navbg={`#1e293b`} />
        <br />
        <br />
        <br />
        <div className="row m-0 d-flex align-items-center m-0">
          <div className="ureg-container">
            <div className="ureg-wrapper">
              {/* LEFT PANEL */}
              <div className="ureg-left">
                <div className="ureg-brand">
                  <h1>Create account</h1>

                  <p>Join the platform and start your journey.</p>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="ureg-right">
                <div className="ureg-card">
                  <h3 style={{ color: `white` }}>Register</h3>

                  <span style={{ color: `white` }}>
                    Create your new account
                  </span>

                  {/* EMAIL */}
                  <div className="ureg-field">
                    <label>Email</label>

                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="ureg-field">
                    <label>Password</label>

                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {loading && (
                    <p className=" mt-3">
                      <ProgressLoad
                        textColor={`text-light`}
                        trigger={1}
                        msg="Please wait..."
                        setSize={`20px`}
                      />
                    </p>
                  )}

                  <Button
                    variant="contained"
                    className={`${loading ? "mt-0" : "mt-3"} mx-1`}
                    onClick={register}
                  >
                    Register
                  </Button>

                  <AlertMessage
                    open={alertData.open}
                    message={alertData.message}
                    type={alertData.type}
                    onClose={() => setAlertData({ ...alertData, open: false })}
                  />

                  <div className="ureg-footer">
                    <span>Already registered?</span>

                    <span
                      onClick={() => router.push("./Login")}
                      className="ureg-link"
                    >
                      Sign in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
/* CONTAINER */
.ureg-container {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0f172a, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* WRAPPER */
.ureg-wrapper {
  width: 100%;
  max-width: 1200px;
  min-height: 700px;
  display: flex;
  background: rgba(17, 24, 39, 0.7);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(99, 102, 241, 0.15);
  box-shadow:
    0 10px 40px rgba(0,0,0,0.6),
    0 0 0 1px rgba(255,255,255,0.03);
}

/* LEFT PANEL */
.ureg-left {
  flex: 1;
  background:
    radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 80%, rgba(0,212,255,0.15), transparent),
    linear-gradient(135deg, #020617, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.ureg-brand h1 {
  color: white;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -1px;
}

.ureg-brand p {
  color: #9ca3af;
  margin-top: 10px;
  font-size: 15px;
}

/* RIGHT PANEL */
.ureg-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

/* CARD */
.ureg-card {
  width: 100%;
  max-width: 400px;
  animation: fadeSlide 0.6s ease;
}

/* ROLE BUTTONS */
.ureg-role {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.ureg-role-btn {
  flex: 1;
  padding: 12px;
  background: rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.05);
  color: #cbd5e1;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.25s;
}

.ureg-role-btn:hover {
  border-color: #6366f1;
  color: white;
}

.ureg-role-btn.active {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  color: white;
  box-shadow: 0 0 15px rgba(99,102,241,0.5);
}

/* FIELD */
.ureg-field {
  margin-top: 20px;
}

.ureg-field label {
  color: #94a3b8;
  font-size: 14px;
}

.ureg-field input {
  width: 100%;
  padding: 13px;
  margin-top: 6px;
  background: rgba(2,6,23,0.6);
  border: 1px solid rgba(255,255,255,0.06);
  color: white;
  border-radius: 10px;
  transition: 0.25s;
}

.ureg-field input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 10px rgba(99,102,241,0.4);
  outline: none;
}

/* BUTTON */
.ureg-btn {
  margin-top: 28px;
  width: 100%;
  padding: 13px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
}

.ureg-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99,102,241,0.4);
}

/* FOOTER */
.ureg-footer {
  margin-top: 20px;
  color: #94a3b8;
  font-size: 14px;
}

.ureg-link {
  color: #6366f1;
  margin-left: 5px;
  cursor: pointer;
}

.ureg-link:hover {
  text-decoration: underline;
}

/* ANIMATION */
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* RESPONSIVE */

/* Tablet */
@media(max-width: 992px) {

  .ureg-wrapper {
    flex-direction: column;
    min-height: auto;
  }

  .ureg-left {
    display: none;
  }

  .ureg-right {
    padding: 20px;
  }

}

/* Mobile */
@media(max-width: 576px) {

  .ureg-container {
    padding: 10px;
  }

  .ureg-card {
    max-width: 100%;
  }

}
      `}</style>
    </>
  );
}

export default Register;
