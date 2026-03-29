import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tasks: [
    {
      title: {
        type: String,
        required: true,
        trim: true
      },

      description: {
        type: String,
        trim: true
      },

      notes: {
        type: String,
        trim: true
      },

      completed: {
        type: Boolean,
        default: false
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]

}, {
  timestamps: true
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;