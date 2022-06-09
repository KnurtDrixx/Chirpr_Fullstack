import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chirps } from "../types";

const NewChirp = () => {
  const nav = useNavigate();
  const [content, setChirpContent] = useState<string>("");
  const [location, setChirpLocation] = useState<string>("");

  const handleCreateChirp = () => {
    fetch(`/api/chirpevent/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content, location }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("You dare make a new chirp? You have success.");
        console.log(data);
        nav(`/Chirps/${Number(data.insertId)}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <form>
          <label>Chirp Content:</label>
          <input placeholder="chirpContent" type="text" value={content} onChange={(e) => setChirpContent(e.target.value)} />
          <label>Chirp Location:</label>
          <input placeholder="chirpLocation" type="text" value={location} onChange={(e) => setChirpLocation(e.target.value)} />
        </form>
        <button onClick={() => handleCreateChirp()}>Submit New Chirp</button>
      </div>
    </>
  );
};

export default NewChirp;
