import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chirps } from "../types";

const SingleChirp = () => {
  const nav = useNavigate();
  const [chirp, setChirp] = useState<Chirps>(null);
  const { id } = useParams();

  const deleteChirp = () => {
    fetch(`/api/chirpevent/${id}`, {
      method: "DELETE",
      // headers: { "content-type": "application/json" },
      // body: JSON.stringify({ content: chirpContent, location: chirpLocation }),
    })
      .then((res) => res.json())
      .then((message) => {
        console.log(message);
        alert(`Chirp ${id} has been found and destroyed`);
        nav(`/Chirps`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch(`/api/chirpevent/${id}`)
      .then((res) => res.json())
      .then((data) => setChirp(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chirp) {
    return <div>Loadin da chirp</div>;
  } else {
    return (
      <div>
        <div>
          <div key={chirp.id}>
            <div>Chirp ID: {chirp.id}</div>
            <div>Created by User {chirp.user_id}</div>
            <div>Chirp Content: {chirp.content}</div>
            <div>Chirp Created at: {chirp.location}</div>
            <div>Chirp Created TimeWise at : {chirp.created_at}</div>
          </div>
        </div>
        <button onClick={() => nav(`/Chirps/${id}/edit`)}>Edit Chirp?</button>
        <button
          onClick={() => {
            deleteChirp();
          }}
        >
          Wouldst tho Delete Chirp?
        </button>
      </div>
    );
  } ///bad stuff
};

export default SingleChirp;
