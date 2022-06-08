import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chirps } from "../types";

const EditChirp = () => {
  const [chirp, setChirp] = useState<Chirps>();
  const { id } = useParams();
  const nav = useNavigate();
  const [chirpContent, setChirpContent] = useState("");
  const [chirpLocation, setChirpLocation] = useState("");

  const handleUpdateChirp = () => {
    fetch(`/api/chirpevent/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: chirpContent, location: chirpLocation }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        nav(`/Chirps/${id}`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/chirpevent/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChirp(data);
        setChirpContent(data.content);
        setChirpLocation(data.location);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!chirp) {
    return <div>Loadin da chirp</div>;
  } else {
    return (
      <>
        <div>
          <form>
            <input readOnly value={`Chirp ID:${chirp.id}`} className="form-control" />
            <input readOnly value={`Created by User: ${chirp.user_id}`} className="form-control" />
            <label>Chirp Content:</label>
            <input value={chirpContent} onChange={(e) => setChirpContent(e.target.value)} />
            <label>Chirp Location:</label>
            <input value={chirpLocation} onChange={(e) => setChirpLocation(e.target.value)} />
            <input readOnly value={`Created TimeWise at : ${chirp.created_at}`} className="form-control" />
          </form>
          <button onClick={() => handleUpdateChirp()}>Submit Edits</button>
        </div>
      </>
    );
  }
};

export default EditChirp;
