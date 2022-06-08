import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Chirps } from "../server/types";
import AllChirps from "./views/AllChirps";
import SingleChirp from "./views/SingleChirp";
import EditChirp from "./views/EditChirp";

const App = (props: AppProps) => {
  const [chirp, setChirp] = useState<Chirps>();

  useEffect(() => {
    fetch("/api/chirpevent")
      .then((res) => res.json())
      .then((data) => setChirp(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="container my-5">
      <h1 className="text-primary text-center">Time for Chirpr</h1>
      <Routes>
        <Route path="/Chirps" element={<AllChirps />} />
        <Route path="/Chirps/:id" element={<SingleChirp />} />
        <Route path="/Chirps/:id/edit" element={<EditChirp />} />
      </Routes>
    </main>
  );
};

interface AppProps {}

export default App;
