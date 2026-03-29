"use client";
import { useParams } from "next/navigation";
import { TextField } from "@mui/material";
import AlertMessage from "@/app/Client/Components/Alert/page";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import api from "@/app/api/axios/api";
import Navbar from "@/app/Client/Components/Navbar/page";
import {Box} from "@mui/material";
import ProgressLoad from "@/app/Client/Components/ProgressLoad/page";
import { useRouter } from "next/navigation";
function ResetPassword() {
  const router = useRouter()
  const { id } = useParams();
  console.log("token",id);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
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

  const resetPassword = async () => {
    try {

        setLoading(true)
        
      const passwordstrict = 4;

      if (newPassword.trim() === "" || !newPassword) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "New Password Required!",
          type: "error",
        });
        return;
      }

      if (newPassword.length < passwordstrict) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Password must be atleast 4 characters",
          type: "error",
        });
        return;
      }

      if (confirmPassword.trim() === "" || !confirmPassword) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Confirm Password Required!",
          type: "error",
        });
        return;
      }

      if (
        newPassword.trim().toLowerCase() !==
        confirmPassword.trim().toLowerCase()
      ) {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Password Mismatched!",
          type: "error",
        });
        return;
      }

      interface bodyType {
        token : string,
        password: string;
      }

      const body: bodyType = {
        token : id as string,
        password: confirmPassword,
      };

      const response = await api.post("/api/auth/resetPassword",
        body,
        {withCredentials : true}
      )

    if (response.status===200) {
        setAlertData({
          open: true,
          message: response.data.msg || "Password Reserted Successfully",
          type: "success",
        });
        setLoading(false);
        setNewPassword("")
        setConfirmPassword("")
        router.push("/Client/Auth/Login")
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
<div className="container-fluid m-0 p-0">
    <Navbar Navbg={`#1e293b`}/>
    <div className="row m-0 d-flex align-items-center">
  <div className="reset-container">

    <div className="reset-wrapper">

      {/* LEFT SLOGAN */}
      <div className="reset-left">

        <div className="reset-brand">

          <h1>
            Create your new
            <br/>
            <span>Secure Password</span>
          </h1>

          <p>
            Your security is our priority.
            <br/>
            Set a strong password to protect your account
            and continue your journey safely.
          </p>

        </div>

      </div>


      {/* RIGHT FORM */}
      <div className="reset-right">

        <div className="reset-card">

          <div className="reset-title">
            Reset Password
          </div>

          <div className="reset-sub">
            Enter your new password below
          </div>


          <Box className="reset-input">

            <TextField
              fullWidth
              type="password"
              label="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
            />

          </Box>


          <Box className="reset-input">

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

          </Box>

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
                    onClick={resetPassword}
                  >
                    Reset
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
    <style>{`
    /* CONTAINER */
.reset-container {

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
.reset-wrapper {

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


/* LEFT SLOGAN */
.reset-left {

  flex: 1;

  background:
    radial-gradient(circle at 20% 30%, rgba(99,102,241,0.25), transparent),
    radial-gradient(circle at 80% 70%, rgba(0,212,255,0.15), transparent);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 60px;

}

.reset-brand h1 {

  color: white;

  font-size: 40px;

  font-weight: 700;

  line-height: 1.2;

}

.reset-brand span {

  background: linear-gradient(135deg,#6366f1,#00d4ff);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;

}

.reset-brand p {

  color: #94a3b8;

  margin-top: 15px;

  font-size: 16px;

  line-height: 1.6;

}


/* RIGHT FORM */
.reset-right {

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 50px;

}

.reset-card {

  width: 100%;
  max-width: 380px;

}


/* TITLE */
.reset-title {

  color: white;

  font-size: 20px;

  font-weight: 600;

}

.reset-sub {

  color: #94a3b8;

  font-size: 14px;

  margin-top: 5px;

}


/* INPUT */
.reset-input {

  margin-top: 20px;

}

.reset-input .MuiOutlinedInput-root {

  background: rgba(2,6,23,0.6);

  border-radius: 10px;

}

.reset-input .MuiOutlinedInput-notchedOutline {

  border-color: rgba(255,255,255,0.08);

}

.reset-input .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

}

.reset-input .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {

  border-color: #6366f1;

  box-shadow: 0 0 10px rgba(99,102,241,0.4);

}

.reset-input input {

  color: white;

}

.reset-input label {

  color: #94a3b8;

}


/* BUTTON */
.reset-btn {

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

.reset-btn:hover {

  transform: translateY(-2px);

  box-shadow: 0 10px 25px rgba(99,102,241,0.4);

}


/* MOBILE */
@media(max-width:992px){

  .reset-left {
    display: none;
  }

  .reset-wrapper {
    flex-direction: column;
  }

}
    `}</style>
</div>
);
}

export default ResetPassword;
