"use client";
import React, { useEffect, useState } from "react";
import api from "@/app/api/axios/api";
import Navbar from "../../Components/Navbar/page";
import AlertMessage from "../../Components/Alert/page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store/reduxStore/store";
import { authGetThunk } from "../../Thunks/authGetThunk/thunk";
import { getLoginHistoryThunk } from "../../Thunks/loginHistoryGetThunk/thunk";
import { getLogoutHistoryThunk } from "../../Thunks/logoutHistoryGetThunk/thunk";
import { TextField, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

function Account() {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaIp, setCaptchaIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);


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

  useEffect(() => {
    dispatch(authGetThunk());
    dispatch(getLoginHistoryThunk());
    dispatch(getLogoutHistoryThunk());
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.auth.user);
  const loginHistory = useSelector(
    (state: RootState) => state.LoginHistory.loginHistory
  );

  const lastLogin = loginHistory[loginHistory.length - 1];

  // Forgot Password
  const forgotPassword = async () => {
    try {
      setLoading(true);
      if (!email.trim()) throw new Error("Email Required");

      const response = await api.post("/api/auth/forgotPassword", 
        { email },
        {withCredentials : true}
      );

      if(response.status === 200){
        setAlertData({
        open: true,
        message: response.data.msg || "Reset link sent",
        type: "success",
      });

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
       finally {
      setLoading(false);
    }
  };

  // Captcha
  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let val = "";
    for (let i = 0; i < 6; i++) {
      val += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(val);
  };

  // Logout
  const SignOut = async () => {
    try {
      setCaptchaLoading(true);

      if (!captchaIp.trim()) throw new Error("Enter captcha");
      if (captchaIp.toLowerCase() !== captcha.toLowerCase())
        throw new Error("Captcha mismatch");

     const response = await api.delete("/api/auth/logout",
      {withCredentials : true}
     );

     if(response){
        setAlertData({
          open: true,
          message: response.data.msg || "Login Successfully",
          type: "success",
        });
        setCaptcha("")
        setCaptchaIp("")
        setCaptchaLoading(false)
        window.location.href = "/";
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
      finally {
      setCaptchaLoading(false);
    }
  };

  return (
    <div className="account-bg pb-lg-5">
      <Navbar />
      <br/><br/><br/>
      <div className="container  py-5 ">
        <h1 className="text-center">Account</h1>
        {/* Profile */}
        <div className="text-center mb-5 mt-4">
          <div className="avatar">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <h4 className="mt-3">{user?.email || "User"}</h4>
          <p className="text-muted-light">Account Overview</p>
        </div>

        {/* Activity */}
        <div className="premium-card mb-4">
          <h5>Login Activity</h5>
          <div className="d-flex justify-content-between mt-3">
            <span>Status</span>
            <span className="fw-bold" style={{color : user? " #22c55e" : "red"}}>
              {user ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span>Last Login</span>
            <span>
              {lastLogin ?  new Date(lastLogin as string).toLocaleString() : "NA"}
            </span>
          </div>


            <div className="d-flex justify-content-between mt-2">
            <span>Last Refresh</span>
            <span>
              {user?.refreshActivity? new Date(user?.refreshActivity as number).toLocaleString() : "NA"}
            </span>
          </div>
        </div>

        

        {/* Grid */}
        <div className="row g-4">

          {/* Change Password */}
          <div className="col-lg-6 col-12">
            <div className="premium-card h-100">
              <h5>Change Password</h5>
<div className="mui-dark mt-4">
  <TextField
    fullWidth
    label="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
<div>
              <Button
                className="btn-premium mt-3 px-3"
                onClick={forgotPassword}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="col-lg-6 col-12">
            <div className="premium-card h-100">
              <h5>Secure Logout</h5>

              {captcha ? (
                <>
                  <div className="captcha-box">
                    <span>{captcha}</span>
                    <RefreshIcon onClick={generateCaptcha} />
                  </div>

                  <input
                    className="form-control mt-3"
                    placeholder="Enter captcha"
                    value={captchaIp}
                    onChange={(e) => setCaptchaIp(e.target.value)}
                  />

                  <Button
                    className="btn-danger-premium mt-3"
                    onClick={SignOut}
                  >
                    {captchaLoading ? "Verifying..." : "Logout"}
                  </Button>
                </>
              ) : (
                <div className="mt-4">
                  <p>Click here to logout your account</p>
                <Button
                  className="btn-danger-premium px-3"
                  onClick={generateCaptcha}
                >
                  Logout
                </Button>
                </div>
              )}
            </div>
            
          </div>
        </div>

        <AlertMessage
          open={alertData.open}
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData({ ...alertData, open: false })}
        />
      </div>
      <style>{`
      .account-bg {
  min-height: 100vh;
  color: white;
}

body{
 background: linear-gradient(135deg, #0f172a, #1e293b);
}

/* Avatar */
.avatar {
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

/* Card */
.premium-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,0.1);
  transition: 0.3s;
}

.premium-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.5);
}

/* Buttons */
.btn-premium {
  background: linear-gradient(135deg, #6366f1, #3b82f6) !important;
  color: white !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
}

.btn-danger-premium {
  background: linear-gradient(135deg, #ef4444, #dc2626) !important;
  color: white !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
}

/* Captcha */
.captcha-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.1);
  padding: 10px 15px;
  border-radius: 10px;
  font-family: monospace;
  letter-spacing: 3px;
}

.captcha-box svg {
  cursor: pointer;
}

/* Text */
.text-muted-light {
  color: rgba(255,255,255,0.6);
}

/* Mobile */
@media (max-width: 768px) {
  .premium-card {
    padding: 15px;
  }
}

.MuiInputBase-input {
  color: white !important;
}

.MuiInputLabel-root {
  color: #aaa !important;
}

.MuiOutlinedInput-root fieldset {
  border-color: #666 !important;
}

.MuiOutlinedInput-root:hover fieldset {
  border-color: #999 !important;
}

.MuiOutlinedInput-root.Mui-focused fieldset {
  border-color: #3b82f6 !important;
}
      `}</style>
    </div>
  );
}

export default Account;