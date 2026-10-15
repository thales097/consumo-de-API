import axios from "axios"
import { useState } from "react"

function DragonBall({ personagem }) {
  return (
    <div>
      <h1>{personagem.name}</h1>

      <img
        src={personagem.image}
        alt={personagem.name}
        width="250"
      />

      <p>Raça: {personagem.race}</p>
      <p>Ki: {personagem.ki}</p>
      <p>Ki máximo: {personagem.maxKi}</p>
      <p>Afiliação: {personagem.affiliation}</p>
      <p>Descrição: {personagem.description}</p>
    </div>
  );
}

export default DragonBall;
