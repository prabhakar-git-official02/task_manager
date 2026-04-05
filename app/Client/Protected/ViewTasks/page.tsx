"use client";

import { useEffect } from "react";

import type { AppDispatch } from "../../Redux/store/reduxStore/store";
import { RootState } from "../../Redux/store/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../Thunks/tasksGetThunk/thunk";
import Navbar from "../../Components/Navbar/page";
import { useState } from "react";
import SearchInput from "../../Components/SearchInput/page";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
function ViewTasks() {
  const dispatch = useDispatch<AppDispatch>();
    const [search, setSearch] = useState<string>("");
  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  const Tasks = useSelector((state: RootState) => state.Tasks.tasks);

  return (
    <div className="view-bg">
      <Navbar Navbg="#3f3f68"/>
      <br/><br/><br/>
      <div className="container py-5">
        <h1 className="title text-center mb-5"> My <span style={{color : "orange"}} >Tasks</span></h1>
                {/* Search */}
        <div className="d-flex justify-content-center  mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder={`Search your tasks`}
          />
        </div>
        {Tasks.length === 0 || !Tasks? 
    <div >
  <h5 className="text-center">No tasks found</h5>
  <p className="text-center">
   Currently, there are no tasks available.
  </p>
   </div> :
<div className="row justify-content-center">
  {Tasks?.filter((t) => t.title?.trim().toLowerCase().includes(search.trim().toLowerCase())).map((t) => (
    <div className="col-12 col-lg-8 mb-4" key={t._id}>
      
      <div className="task-card big-card">


        <h4 className="fw-bold mb-3">{t.title}</h4>


        <p className="desc big-text">{t.description || "no description available"}</p>


        <div className="notes big-notes">
          {t.notes || "No notes available"}
        </div>

   
        <div className="d-flex justify-content-between align-items-center mt-4">

          <span className={`status ${t.completed ? "done" : "pending"}`}>
            {t.completed ? <span className="fs-6 mx-1"><TaskIcon/> Completed</span>:<span className="fs-6 mx-1"><PendingActionsIcon/> Pending</span>}
          </span>

          <small className="date">
            {new Date(t.createdAt as string).toLocaleString()}
          </small>
        </div>

      </div>
    </div>
  ))}
</div>
}
      </div>


      <style jsx>{`

      .big-card {
  padding: 30px;
  border-radius: 20px;
}

.big-text {
  font-size: 16px;
}

.big-notes {
  font-size: 14px;
  padding: 15px;
}
        .view-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e1e2f, #2a2a40, #12121c);
          color: white;
        }

        .title {
          font-weight: 700;
          letter-spacing: 1px;
        }

        .task-card {
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 20px;
          transition: 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .task-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }

        .desc {
          font-size: 14px;
          opacity: 0.85;
        }

        .notes {
          background: rgba(255,255,255,0.08);
          padding: 10px;
          border-radius: 10px;
          margin-top: 10px;
          font-size: 13px;
        }

        .status {
          padding: 3px 5px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 300;
        }

        .done {
          background: #00ffcc;
          color: black;
        }

        .pending {
          background: orange;
          color: black;
        }

        .date {
          font-size: 12px;
          opacity: 0.7;
        }

        @media(max-width: 768px){
          .title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}

export default ViewTasks;