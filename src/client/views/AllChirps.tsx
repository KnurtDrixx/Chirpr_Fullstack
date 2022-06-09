import * as React from "react";
import { useState, useEffect } from "react";
import { Chirps } from "../types";
import { useNavigate } from "react-router-dom";

const AllChirps = () => {
  const [chirp, setChirp] = useState<Chirps[]>([]);
  const [color, setColor] = useState<String>("");
  const nav = useNavigate();

  useEffect(() => {
    fetch("/api/chirpevent/")
      .then((res) => res.json())
      .then((data) => setChirp(data))
      .catch((err) => console.log(err));
  }, []);

  const randomColor = () => {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    return `rgb(${R}, ${G}, ${B})`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(randomColor());
    }, 5000);
    return () => clearInterval(interval);
  }, [color]);

  return (
    <>
      <div>
        {chirp.map((chirp) => (
          <div key={chirp.id}>
            <div style={{ color: randomColor() }}>Chirp ID: {chirp.id}</div>
            <div style={{ color: randomColor() }}>Chirp Content: {chirp.content}</div>
            <div style={{ color: randomColor() }}>Chirp Created at: {chirp.location}</div>
            <button
              className="btn"
              style={{ color: randomColor(), backgroundColor: randomColor() }}
              type="button"
              onClick={() => {
                nav(`/Chirps/${chirp.id}`);
              }}
            >
              View this chirp
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllChirps;
