"use client";
import { TextField } from "@mui/material";
import AlertMessage from "../../Components/Alert/page";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import api from "@/app/api/axios/api";
import Navbar from "../../Components/Navbar/page";
import ProgressLoad from "../../Components/ProgressLoad/page";
import {Box} from "@mui/material";
function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
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

  const forgotPassword = async () => {
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
      }

      const body: bodyType = {
        email: email,
      };

      const response = await api.post("/api/auth/forgotPassword", body, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setAlertData({
          open: true,
          message: response.data.msg || "Resent Link Sent to your Email",
          type: "success",
        });
        setLoading(false);
        setEmail("");
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
 return(
            <div className="container-fluid m-0 p-0">
              <Navbar Navbg={`#1e293b`}/>
              <div className="row m-0 d-flex align-items-center">
  <div className="forgot-container vh-100">

    <div className="forgot-wrapper">

      {/* LEFT */}
{/* LEFT */}
<div className="forgot-left">

  <div className="forgot-brand">

    <h1>
      Recover your
      <br/>
      <span>Account Access</span>
    </h1>

    <p>
      {`Don't worry. It happens.
      <br/>
      Enter your email and we'll send you a secure reset link
      to get back into your account instantly`}
    </p>

  </div>

</div>


      {/* RIGHT */}
      <div className="forgot-right">

        <div className="forgot-card">

          <div>
            <div className="forgot-title">
              Forgot Password ?
            </div>

            <div className="forgot-sub">
              Enter your email to receive reset link
            </div>
          </div>


          <Box className="forgot-input">

            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

          </Box>


          <div className="mt-3">
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
                                onClick={forgotPassword}
                              >
                                Submit
                              </Button>
            
                              <AlertMessage
                                open={alertData.open}
                                message={alertData.message}
                                type={alertData.type}
                                onClose={() => setAlertData({ ...alertData, open: false })}
                              />

          </div>
        </div>

      </div>

    </div>

  </div>
              </div>
              <style>{`
              /* CONTAINER */
.forgot-container {
  min-height: calc(100vh - 70px);

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
.forgot-wrapper {

  width: 100%;
  max-width: 1100px;

  display: flex;

  background: rgba(17,24,39,0.65);

  backdrop-filter: blur(25px);

  border-radius: 20px;

  overflow: hidden;

  border: 1px solid rgba(255,255,255,0.06);

  box-shadow:
    0 20px 60px rgba(0,0,0,0.7);

}


/* LEFT SIDE */
/* LEFT SIDE SLOGAN */
.forgot-left {

  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

}


/* BRAND CONTENT */
.forgot-brand {

  max-width: 420px;

}


.forgot-brand h1 {

  color: white;

  font-size: 40px;

  font-weight: 700;

  line-height: 1.2;

}


.forgot-brand span {

  background: linear-gradient(135deg,#6366f1,#00d4ff);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}


.forgot-brand p {

  color: #94a3b8;

  margin-top: 15px;

  font-size: 16px;

  line-height: 1.6;

}


/* RIGHT SIDE */
.forgot-right {

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px;

}


/* CARD */
.forgot-card {

  width: 100%;
  max-width: 380px;

}


/* TITLE */
.forgot-title {

  color: white;

  font-size: 20px;

  font-weight: 600;

}

.forgot-sub {

  color: #94a3b8;

  font-size: 14px;

  margin-top: 5px;

}


/* INPUT */
.forgot-input {

  margin-top: 20px;

}

.forgot-input .MuiOutlinedInput-root {

  background: rgba(2,6,23,0.6);

  border-radius: 10px;

}

.forgot-input .MuiOutlinedInput-notchedOutline {

  border-color: rgba(255,255,255,0.08);

}

.forgot-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

}

.forgot-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

  box-shadow:
    0 0 10px rgba(99,102,241,0.4);

}

.forgot-input input {

  color: white;

}

.forgot-input label {

  color: #94a3b8;

}


/* BUTTON */
.forgot-btn {

  margin-top: 25px;

  width: 100%;

  padding: 12px;

  background: linear-gradient(135deg,#6366f1,#4f46e5);

  border-radius: 10px;

  color: white;

  font-weight: 600;

  border: none;

  cursor: pointer;

  transition: 0.25s;

}

.forgot-btn:hover {

  transform: translateY(-2px);

  box-shadow:
    0 10px 25px rgba(99,102,241,0.4);

}


/* MOBILE */
@media(max-width:992px){

  .forgot-left {
    display: none;
  }

  .forgot-wrapper {
    flex-direction: column;
  }

}
              `}</style>
            </div>
    )
}

export default ForgotPassword;
