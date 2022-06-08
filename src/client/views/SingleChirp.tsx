import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Chirps } from "../types";

const SingleChirp = () => {
  const nav = useNavigate();
  const [chirp, setChirp] = useState<Chirps>(null);
  const { id } = useParams();

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
      </div>
    );
  } ///bad stuff
};

export default SingleChirp;
