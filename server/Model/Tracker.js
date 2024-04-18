import mongoose from "mongoose";

const trackersSchema = new mongoose.Schema({
  runs: Number,
  goblins: Number,
  rbgs: Number,
})

const Tracker = mongoose.model("trackers", trackersSchema)

export default Tracker;