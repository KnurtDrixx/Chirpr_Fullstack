import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Chirps } from "../server/types";
import Navbar from "../components/Navbar";
import AllChirps from "./views/AllChirps";
import SingleChirp from "./views/SingleChirp";
import EditChirp from "./views/EditChirp";
import NewChirp from "./views/NewChirp";

const App = (props: AppProps) => {
  const [chirp, setChirp] = useState<Chirps>();
  const [color, setColor] = useState<String>("");
  const [welcomeMessage, setWelcomeMessage] = useState<String>("Time for Chirpr");

  useEffect(() => {
    fetch("/api/chirpevent")
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
    <main className="container my-5" style={{ backgroundColor: `${color}` }}>
      {/* #ts-ignore */}
      <marquee behavior="alternate" scrollamount="15">
        <h1 style={{ backgroundColor: randomColor() }}>
          {welcomeMessage.split("").map((char, i) => (
            <span key={i} style={{ color: randomColor() }}>
              {char}
            </span>
          ))}
        </h1>
      </marquee>

      <Navbar />
      <Routes>
        <Route path="/Chirps" element={<AllChirps />} />
        <Route path="/Chirps/:id" element={<SingleChirp />} />
        <Route path="/Chirps/:id/edit" element={<EditChirp />} />
        <Route path="/Chirps/New" element={<NewChirp />} />
      </Routes>
    </main>
  );
};

interface AppProps {}

export default App;
