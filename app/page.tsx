"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGetThunk } from "./Client/Thunks/authGetThunk/thunk";
import type { AppDispatch, RootState } from "./Client/Redux/store/reduxStore/store";
import Navbar from "./Client/Components/Navbar/page";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authGetThunk());
  }, [dispatch]);

    const AuthStatus = useSelector((state:RootState) => state.auth.status)
  
    console.log("AuthStatus",AuthStatus)

  return (
    <div className="main-wrapper">
      <Navbar Navbg="#396f80" />
      <br/>

      <section className="hero container">
        <div className="row align-items-center g-5">
          
    
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="hero-title">
              Manage Tasks <br />
              <span>Smart & Fast</span>
            </h1>

            <p className="hero-text">
              Plan your day, track progress, and stay productive with a premium
              task manager experience.
            </p>

            <div className="hero-btns d-flex gap-3 justify-content-center justify-content-lg-start">
              <button
                onClick={() => router.push("/Client/Protected/AddTask")}
                className="btn btn-gradient"
              >
                <span>Get Started</span>
                <RocketLaunchIcon />
              </button>
            </div>
          </div>

     
          <div className="col-lg-6 text-center ">
            <div className="image-wrapper ">
<Image
  src="/taskImage1.jpg"
  alt="Task Manager"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="hero-img rounded-5"
   loading="eager"
/>
            </div>
          </div>

        </div>
      </section>

  
      <section className="container py-5">
        <div className="row g-4">
          {["Create Your Task", "Modify Task Details", "View Your Tasks"].map((item, i) => (
            <div key={i} className="col-md-4">
              <div className="feature-card" 
              style={{cursor : "pointer"}}
              onClick={() =>
                 item === "Create Your Task" ? router.push("/Client/Protected/AddTask"):
                 item === "Modify Task Details" ? router.push("/Client/Protected/ManageTasks"):
                 item === "View Your Tasks" ? router.push("/Client/Protected/ViewTasks"):
                 router.push('/')
              }>
                <h5>{item}</h5>
                <p>{item==="Create Your Task"?"Organize your work by adding a new task below" :
                 item === "Modify Task Details" ? "Update the information and save your task" : 
                 item === "View Your Tasks" ? "View the complete details of your task." : "Explore and access your tasks"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <footer className="footer">
        <h5>Contact</h5>

        <p>
          <EmailIcon /> Email:
          <a href="mailto:prabhakaroffcl@gmail.com">
            prabhakaroffcl@gmail.com
          </a>
        </p>

        <p>
          <LinkedInIcon /> Linkedin:
          <a href="https://www.linkedin.com/in/prabhakaroffcl02" target="_blank">
            prabhakaroffcl02
          </a>
        </p>

        <p>© {new Date().getFullYear()} Task Manager</p>
      </footer>

      {/* STYLES */}
      <style jsx>{`
        .main-wrapper {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          min-height: 100vh;
          overflow-x: hidden;
        }

       
        .hero {
          padding: 90px 15px 40px;
          text-align: center;
        }

        .hero-title {
          font-size: 2rem;
          font-weight: 700;
        }

        .hero-title span {
          color: #00c6ff;
        }

        .hero-text {
          margin: 15px 0;
          color: #cbd5e1;
        }

        /* BUTTONS */
        .hero-btns {
          flex-direction: column;
          width: 100%;
          align-items: center;
        }

        .btn-gradient {
          background: linear-gradient(45deg, #00c6ff, #0072ff);
          border: none;
          color: white;
          padding: 12px 20px;
          border-radius: 50px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .custom-outline {
          border-radius: 50px;
          padding: 12px 20px;
          width: 100%;
          border: 1px solid rgba(255,255,255,0.5);
          color: white;
        }

        /* IMAGE */
.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 420px; 
  aspect-ratio: 1 / 1; 
  margin: 30px auto 0;
}

.hero-img {
  object-fit: cover;
  border-radius: 20px;
  width: 100%;
  height: 100%;
}

@media (min-width: 576px) {
  .image-wrapper {
    max-width: 320px;
    height: 320px;
  }
}

@media (min-width: 992px) {
  .image-wrapper {
    max-width: 420px;
    height: 420px;
  }
}

        .hero-img {
          width: 100%;
          max-width: 240px;
          height: auto;
          border-radius: 20px;
        }

        /* FEATURES */
        .feature-card {
          padding: 20px;
          border-radius: 18px;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.08);
          text-align: center;
          transition: 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        /* FOOTER */
        .footer {
          text-align: center;
          padding: 25px 15px;
          background: #020617;
          margin-top: 40px;
        }

        .footer p {
          display: flex;
          justify-content: center;
          gap: 5px;
          flex-wrap: wrap;
        }

        .footer a {
          color: #00c6ff;
        }

        /* TABLET */
        @media (min-width: 768px) {
          .hero {
            text-align: left;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-btns {
            flex-direction: row;
            width: auto;
          }

          .btn-gradient,
          .custom-outline {
            width: auto;
          }

          .hero-img {
            max-width: 320px;
          }
        }

        /* DESKTOP */
        @media (min-width: 992px) {
          .hero-title {
            font-size: 3rem;
          }

          .hero-img {
            max-width: 420px;
          }
        }
      `}</style>
    </div>
  );
}