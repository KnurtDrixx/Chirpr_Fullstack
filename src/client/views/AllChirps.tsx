import * as React from "react";
import { useState, useEffect } from "react";
import { Chirps } from "../types";
import { useNavigate } from "react-router-dom";

const AllChirps = () => {
  const [chirp, setChirp] = useState<Chirps[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/chirpevent/")
      .then((res) => res.json())
      .then((data) => setChirp(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div>
        {chirp.map((chirp) => (
          <div key={chirp.id}>
            <div>Chirp ID: {chirp.id}</div>
            <div>Chirp Content: {chirp.content}</div>
            <div>Chirp Created at: {chirp.location}</div>
            <button
              type="button"
              onClick={() => {
                nav(`/Chirps/${chirp.id}`);
              }}
            >
              view this chirp
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllChirps;
