import { Chirps, UpdateChirpInfo } from "../../types";
import { queryAll } from "../index";

const getAll = () => queryAll<Chirps[]>("SELECT * FROM Chirps", []);
const getOne = (id: number) => queryAll<Chirps[]>("SELECT * FROM Chirps WHERE id = ?", [id]);
const destroyOne = (id: number) => queryAll("DELETE FROM Chirps WHERE id = ?", [id]);
const createOne = (newChirp: UpdateChirpInfo) => queryAll("INSERT INTO Chirps SET ?", [newChirp]);
const updateOne = (updatedChirp: UpdateChirpInfo, id: number) => queryAll("UPDATE Chirps SET ? WHERE id=?", [updatedChirp, id]);

export default {
  getAll,
  getOne,
  destroyOne,
  createOne,
  updateOne,
};

// make a const create Chirp
