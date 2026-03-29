"use client";
import { useState } from "react";
import { TextField } from "@mui/material";
import AlertMessage from "@/app/Client/Components/Alert/page";
import api from "@/app/api/axios/api";
import axios from "axios";
import type { AppDispatch,RootState } from "@/app/Client/Redux/store/reduxStore/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTasksThunk } from "@/app/Client/Thunks/tasksGetThunk/thunk";
import { useParams } from "next/navigation";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Navbar from "@/app/Client/Components/Navbar/page";
import ProgressLoad from "@/app/Client/Components/ProgressLoad/page";
function EditTask() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasksThunk());
  }, [dispatch]);

  const Tasks = useSelector((state: RootState) => state.Tasks.tasks);

  const task = Tasks.find((t) => t?._id as string === id as string);

  console.log(task);

  const [title, setTitle] = useState<string>(task?.title as string);
  const [description, setDescription] = useState<string>(
    task?.description as string,
  );
  const [notes, setNotes] = useState<string>(task?.notes as string);
  const [completed, setCompleted] = useState<boolean>(
    task?.completed as boolean,
  );
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

  interface updateDataType {
    title?: string;
    description?: string;
    notes?: string;
    completed?: boolean;
  }

  const UpdatedData: updateDataType = {
    title: title,
    description: description,
    notes: notes,
    completed: completed,
  };
  const editTask = async (id: string) => {
    try {
      setLoading(true);

      if (!title || title.trim() === "") {
        setLoading(false);
        setAlertData({
          open: true,
          message: "Title Required",
          type: "error",
        });
        return;
      }

      const response = await api.patch(
        `/api/crud/editTask/${id}`,
        UpdatedData,
        { withCredentials: true },
      );
      if(response.status === 200){
         setLoading(false);
        setAlertData({
          open: true,
          message: response?.data?.msg || "Task Updated",
          type: "success",
        });
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setLoading(false);
        setAlertData({
          open: true,
          message: err?.response?.data?.msg,
          type: "error",
        });
        return;
      } else {
        if (err instanceof Error) {
          setLoading(false);
          setAlertData({
            open: true,
            message: err?.message,
            type: "error",
          });
          return;
        }
      }
    }
  };

   return (
    <div className="task-bg">
      <Navbar />
      <br/><br/><br/><br/><br/>
      <div className="task-container">
        <div className="task-header">
          <h1>
            Edit <span  style={{color : "#22c55e"}} >Task</span>
          </h1>
          <p>Manage your tasks efficiently in one place.</p>
        </div>
  
        {/* Card */}
        <div className="task-card">
          <h2>Modify Task Details</h2>
          <p className="card-subtitle">
            Update the information and save your task.
          </p>
  
          <div className="form-group">
            <TextField
              fullWidth
              label="Task Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <TextField
              fullWidth
              label="Task Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
  
          <div className="form-group">
            <textarea
              className="custom-textarea"
              placeholder="Write notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

  <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Task Completed?</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="no"
    onChange={(e) => e.target.value === "yes" ? setCompleted(true) : setCompleted(false)}
    name="radio-buttons-group"
  >
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
  </RadioGroup>
</FormControl>
  
          <AlertMessage
            open={alertData.open}
            message={alertData.message}
            type={alertData.type}
            onClose={() => setAlertData({ ...alertData, open: false })}
          />
  
          {loading && (
            <div className="loader-box">
              <ProgressLoad setSize="20px" trigger={1} msg="Updating..." />
            </div>
          )}
  
          <button className="task-btn" onClick={() =>editTask(task?._id as string)}>
            Edit Task
          </button>
        </div>
      </div>
    <style>
      {`
      /* Background */
  .task-bg {
    min-height: 100vh;
    background: linear-gradient(135deg, #eef2ff, #f8fafc);
  }
  
  /* Container */
  .task-container {
    min-height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 20px;
  }
  
  /* Header */
  .task-header {
    text-align: center;
    margin-bottom: 15px; 
  }
  
  /* Card */
  .task-card {
    width: 100%;
    max-width: 520px;
    margin-top: 10px; 
  }
  
  /* Header */
  .task-header {
    text-align: center;
    margin-bottom: 30px;
    animation: fadeDown 0.6s ease;
  }
  
  .task-header h1 {
    font-size: 34px;
    font-weight: 700;
  }
  
  .task-header span {
    color: #3b82f6;
  }
  
  .task-header p {
    color: #6b7280;
    font-size: 14px;
  }
  
  /* Card */
  .task-card {
    width: 100%;
    max-width: 520px;
    background: #ffffff;
    padding: 30px;
    border-radius: 18px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.08);
    animation: fadeUp 0.6s ease;
    transition: 0.3s;
  }
  
  /* Hover */
  .task-card:hover {
    transform: translateY(-6px);
  }
  
  /* Card Title */
  .task-card h2 {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
  }
  
  .card-subtitle {
    text-align: center;
    color: #6b7280;
    margin-bottom: 20px;
    font-size: 13px;
  }
  
  /* Inputs */
  .form-group {
    margin-bottom: 18px;
  }
  
  /* Textarea */
  .custom-textarea {
    width: 100%;
    min-height: 110px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    padding: 10px;
    transition: 0.3s;
  }
  
  /* Focus */
  .custom-textarea:focus {
    outline: none;
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
  }
  
  /* Button */
  .task-btn {
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    font-weight: 600;
    transition: 0.3s;
  }
  
  /* Button hover */
  .task-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 12px 30px rgba(34, 197, 94, 0.3);
  }
  
  /* Loader */
  .loader-box {
    text-align: center;
    margin-bottom: 10px;
  }
  
  /* Animations */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* ================= MOBILE ================= */
  @media (max-width: 576px) {
    .task-container {
      padding: 20px 15px;
    }
  
    .task-header h1 {
      font-size: 24px;
    }
  
    .task-card {
      padding: 20px;
      border-radius: 14px;
    }
  
    .task-btn {
      font-size: 14px;
    }
  }
  
  /* ================= TABLET ================= */
  @media (min-width: 577px) and (max-width: 992px) {
    .task-card {
      max-width: 600px;
    }
  }
  
  /* ================= LARGE SCREEN ================= */
  @media (min-width: 1200px) {
    .task-card {
      max-width: 650px;
      padding: 40px;
    }
  
    .task-header h1 {
      font-size: 38px;
    }
  }
      `}
    </style>
  </div>
    );
}

export default EditTask;
