"use client";
import { useState } from "react";
import api from "@/app/api/axios/api";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import AlertMessage from "../../Components/Alert/page";
import axios from "axios";
import Navbar from "../../Components/Navbar/page";
import ProgressLoad from "../../Components/ProgressLoad/page";
function Login() {
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

  const login = async () => {
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

      interface bodyType {
        email: string;
        password: string;
      }

      const body: bodyType = {
        email: email,
        password: password,
      };

      const response = await api.post("/api/auth/login", body, {
        withCredentials: true,
      });

      if (response) {
        setAlertData({
          open: true,
          message: response.data.msg || "Login Successfully",
          type: "success",
        });
        setLoading(false);
        setEmail("");
        setPassword("");
        router.refresh();
        router.push("/");
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
        <div className="row m-0 d-flex align-items-center">
          <div className="ultra-container">
            <div className="ultra-wrapper">
              {/* LEFT SIDE */}
              <div className="ultra-left">
                <div className="ultra-brand">
                  <h1>Welcome back</h1>

                  <p>
                    Sign in to access your dashboard and continue your workflow.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="ultra-right">
                <div className="ultra-card">
                  <div className="ultra-header">
                    <h3>Sign in</h3>

                    <span>Use your email and password</span>
                  </div>

                  <form onSubmit={login}>
                    <div className="ultra-field">
                      <label>Email</label>

                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="ultra-field">
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
                      onClick={login}
                    >
                      Login
                    </Button>

                    <AlertMessage
                      open={alertData.open}
                      message={alertData.message}
                      type={alertData.type}
                      onClose={() =>
                        setAlertData({ ...alertData, open: false })
                      }
                    />
                  </form>
                  <div className="ultra-footer">
                    <span
                      style={{ cursor: `pointer` }}
                      onClick={() => router.push("./ForgotPassword")}
                    >
                      Forgot password
                    </span>

                    <span
                      style={{ cursor: `pointer` }}
                      onClick={() => router.push("./Register")}
                    >
                      Create account
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
.ultra-container {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 20%, rgba(99,102,241,0.15), transparent),
    radial-gradient(circle at 90% 80%, rgba(0,212,255,0.12), transparent),
    #020617;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}


/* WRAPPER */
.ultra-wrapper {
  width: 100%;
  max-width: 1200px;
  min-height: 700px;
  display: flex;

  background: rgba(17,24,39,0.65);
  backdrop-filter: blur(25px);

  border-radius: 20px;
  overflow: hidden;

  border: 1px solid rgba(255,255,255,0.06);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.7),
    inset 0 0 0 1px rgba(255,255,255,0.02);

  animation: ultraFade 0.6s ease;
}


/* LEFT */
.ultra-left {
  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent),
    linear-gradient(135deg, #020617, #020617);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.ultra-brand h1 {
  color: white;
  font-size: 46px;
  font-weight: 700;
  letter-spacing: -1px;
}

.ultra-brand p {
  color: #94a3b8;
  margin-top: 12px;
  font-size: 16px;
}


/* RIGHT */
.ultra-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}


/* CARD */
.ultra-card {
  width: 100%;
  max-width: 400px;
}

.ultra-header h3 {
  color: white;
  font-weight: 600;
  font-size: 22px;
}

.ultra-header span {
  color: #94a3b8;
  font-size: 14px;
}


/* FIELD */
.ultra-field {
  margin-top: 20px;
}

.ultra-field label {
  color: #94a3b8;
  font-size: 14px;
}

.ultra-field input {
  width: 100%;
  margin-top: 6px;
  padding: 13px;

  background: rgba(2,6,23,0.6);

  border: 1px solid rgba(255,255,255,0.06);

  border-radius: 10px;

  color: white;

  transition: all 0.25s ease;
}

.ultra-field input:focus {
  border-color: #6366f1;

  box-shadow:
    0 0 0 1px rgba(99,102,241,0.4),
    0 0 15px rgba(99,102,241,0.25);

  outline: none;
}


/* BUTTON */
.ultra-btn {
  margin-top: 28px;
  width: 100%;
  padding: 13px;

  background: linear-gradient(135deg, #6366f1, #4f46e5);

  border: none;

  border-radius: 10px;

  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: all 0.25s ease;
}

.ultra-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(99,102,241,0.4);
}


/* GOOGLE BUTTON */
.ultra-google {
  width: 100%;
  margin-top: 15px;
  padding: 13px;

  background: rgba(255,255,255,0.02);

  border: 1px solid rgba(255,255,255,0.08);

  color: white;

  border-radius: 10px;

  cursor: pointer;

  transition: all 0.25s ease;
}

.ultra-google:hover {
  border-color: #6366f1;
  background: rgba(99,102,241,0.08);
}


/* FOOTER */
.ultra-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
  color: #94a3b8;
  font-size: 14px;
}

.ultra-footer span:hover {
  color: #6366f1;
}


/* ANIMATION */
@keyframes ultraFade {

  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}


/* TABLET */
@media(max-width: 992px){

  .ultra-left {
    display: none;
  }

  .ultra-wrapper {
    flex-direction: column;
    min-height: auto;
  }

}


/* MOBILE */
@media(max-width: 576px){

  .ultra-container {
    padding: 10px;
  }

  .ultra-card {
    max-width: 100%;
  }

}
      `}</style>
    </>
  );
}

export default Login;
