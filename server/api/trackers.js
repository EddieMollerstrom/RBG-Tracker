import Tracker from "../Model/Tracker.js";

export default function (server, db) {
  server.get("/api/trackers", async (req, res) => {
    res.json(await Tracker.find())
  })

  server.get("/api/trackers/:id", async (req, res) => {
    const id = req.params.id;
    const trackers = await Tracker.findById(id);
    res.json(trackers);
  });

  server.post("/api/trackers", async (req, res) => {
    try {
      const newTracker = new Tracker({
        runs: req.body.runs,
        goblins: req.body.goblins,
        rbgs: req.body.rbgs
      })

      const savedTracker = await newTracker.save()

      res.status(201).json(savedTracker)

    } catch (err) {
      res.status(400).json({ message: "Något gick fel." }, err);
    }
  })

  server.patch('/api/trackers/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updates = {
        runs: req.body.runs,
        goblins: req.body.goblins,
        rbgs: req.body.rbgs
      };

      const result = await Tracker.findByIdAndUpdate(id, updates, { new: true });

      if (!result) {
        return res.status(404).json({ error: "Tracker not found" });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

