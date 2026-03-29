"use client";

import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../Redux/store/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { getTasksThunk } from "../../Thunks/tasksGetThunk/thunk";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import api from "@/app/api/axios/api";
import AlertMessage from "../../Components/Alert/page";
import { useRouter } from "next/navigation";
import Navbar from "../../Components/Navbar/page";
import ProgressLoad from "../../Components/ProgressLoad/page";
import SearchInput from "../../Components/SearchInput/page";
function ManageTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
   const [search, setSearch] = useState<string>("");

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  const Tasks = useSelector((state: RootState) => state.Tasks.tasks);

  const [loading, setLoading] = useState(false);
  const [caughtId, setCaughtId] = useState("");

  const [alertData, setAlertData] = useState({
    open: false,
    message: "",
    type: "info" as "success" | "error" | "warning" | "info",
  });

  const deletetask = async (id: string) => {
    try {
      setLoading(true);
      setCaughtId(id);

      await api.delete(`/api/crud/deleteTask/${id}`, {
        withCredentials: true,
      });

      dispatch(getTasksThunk());
      setAlertData({
        open: true,
        message: "Deleted successfully",
        type: "success",
      });
    } catch {
      setAlertData({
        open: true,
        message: "Delete failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="main-bg">
      <Navbar Navbg="teal"/>
      <br/><br/><br/>
      <div className="container py-5">
        <h1 className="title text-center mb-5"><span>Manage</span><span style={{color : "orange"}} className="mx-2">Tasks</span></h1>
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
        <div className="row g-4">
          {Tasks?.filter((t) => t.title?.trim().toLowerCase().includes(search.trim().toLowerCase())).map((t) => (
            <div className="col-12 col-md-6 col-xl-4" key={t._id}>
              
              <div className="glass-card">

      
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold">{t.title}</h5>

                  <span className={`status ${t.completed ? "done" : "pending"}`}>
                    {t.completed ? "✔ Done" : "⏳ Pending"}
                  </span>
                </div>

                <div className="description-box">
                  {t.description || "No Description"}
                </div>


                <div className="d-flex justify-content-between align-items-center mt-4">

                  <button
                    className="action-btn edit"
                    onClick={() => router.push(`/Client/Protected/editTask/${t._id}`)}
                  >
                    <EditNoteIcon />
                  </button>

                  {loading && caughtId === t._id ? (
                    <span className="text-light small"><ProgressLoad msgClass="fw-bold" trigger={1} msg="Deleting task.." setSize="20px"/></span>
                  ) : (
                    <span
                    style={{cursor : "pointer"}}
                      onClick={() => deletetask(t._id as string)}
                    >
                      <DeleteForeverIcon />
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
}
      </div>
        

      <AlertMessage
        open={alertData.open}
        message={alertData.message}
        type={alertData.type}
        onClose={() => setAlertData({ ...alertData, open: false })}
      />

   
      <style jsx>{`
        .main-bg {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
        }

        .title {
          font-weight: 700;
          letter-spacing: 1px;
        }

        .glass-card {
          backdrop-filter: blur(15px);
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 20px;
          transition: 0.4s;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .description-box {
          background: rgba(255,255,255,0.1);
          padding: 10px;
          border-radius: 10px;
          margin-top: 10px;
          font-size: 13px;
        }

        .status {
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .done {
          background: #00ffcc;
          color: black;
        }

        .pending {
          background: orange;
          color: black;
        }

        .action-btn {
          border: none;
          padding: 8px 12px;
          border-radius: 10px;
          transition: 0.3s;
        }

        .edit {
          background: #4facfe;
          color: white;
        }

        .delete {
          background: #ff4d4d;
          color: white;
        }

        .action-btn:hover {
          transform: scale(1.1);
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

export default ManageTasks;
