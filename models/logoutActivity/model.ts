import mongoose from "mongoose";

const LogoutActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  logoutHistory: [
    {
      type: Date,
      default: Date.now
    }
  ]

}, {
  timestamps: true
});

const LogoutActivity = 
mongoose.models.LogoutActivity ||  mongoose.model(
  "LogoutActivity",
  LogoutActivitySchema,
  "logout_activity"
);

export default LogoutActivity;