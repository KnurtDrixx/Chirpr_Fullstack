import * as express from "express";
import db from "../database/queries/chirps";

const router = express.Router();

//current path is /api/chirpevent

//gets all chirp
router.get("/", async (req, res) => {
  try {
    const chirps = await db.getAll();
    if (chirps) {
      res.json(chirps);
    } else {
      res.status(400).json({ message: "You are looking for chirps that don't exist. Stop that." });
    }
    //res.json(chirps);
    //res.status(200).json({ message: "A getAll occurred" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getAll error occurred" });
  }
});

//get one chirp
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const chirp = await db.getOne(id);
    if (chirp.length) {
      res.json(chirp);
    } else {
      res.status(400).json({ message: "You are looking for a chirp that doesn't exist. Stop that." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A getOne error occurred." });
  }
});

//create a chirp
router.post("/", async (req, res) => {
  const content: string = req.body.content;
  const location: string = req.body.location;
  const newChirpInfo = { user_id: 1, content, location };
  //user_id:number; content:string; location:string;
  try {
    const chirp = await db.createOne(newChirpInfo);
    res.json(chirp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A createOne error occurred" });
  }
});
//update a chirp
router.put("/:id", async (req, res) => {
  let { content, location } = req.body;
  const id = Number(req.params.id);
  const updateChirpInfo = { user_id: 1, content, location };

  try {
    const update = await db.updateOne(updateChirpInfo, id);
    if (update.affectedRows) {
      res.status(200).json({ message: "update success" });
    } else {
      res.status(400).json({ message: "update failure X(" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A updateOne error occurred" });
  }
});

//delete a chirp
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const destroy = await db.destroyOne(id);

    if (destroy.affectedRows) {
      res.status(200).json({ message: "target destroyed" });
    } else {
      res.status(400).json({ message: "target escaped deletion" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "A destroyOne error occurred" });
  }
});

export default router;
