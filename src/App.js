import { useState } from "react";
import { db } from "./firebaseConnection";
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";

import './app.css';

function App() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');

   async function handleApp(){
   /* await setDoc(doc(db, "posts", "12345"), {
      titulo:  titulo,
      autor: autor,
    })
    .then(() => {
      console.log("Salvo no banco.")
    })
    .catch((error) => {
      console.log("Gerou um error " + error)
    }) */

    await addDoc(collection(db, "posts"), { //addDoc gera um ID aleatorio.
      titulo: titulo,
      autor: autor,
    })
    .then (() => {
      console.log("Dados salvos no banco")
      setTitulo('');
      setAutor('');
    })
    .catch((error) => {
      console.log("Deu erro " + error)
    })

  }

  async function buscarPost() {

    const postRef = doc(db, "posts", "12345")

    await getDoc(postRef)
    .then((snapshot) => {
        setAutor(snapshot.data().autor)
        setTitulo(snapshot.data().titulo)
    })
    .catch(() => {
      console.log ("Deu error")
    })
  }

  return (
    <div>
      <h1>Firebase</h1>

    <div className="container">

      <label>Titulo:</label>
      <textarea type="text"
       placeholder="Digite o titulo aqui" 
       value={titulo}
       onChange={(e) => setTitulo (e.target.value) }
       />

      <label>Autor:</label>
      <input type="text"
      placeholder="Autor do post aqui" 
      value={autor}
      onChange={(e) => setAutor(e.target.value) }
      />

      <button onClick={handleApp}>Cadastrar</button>
      <button onClick={buscarPost}>Buscar</button>

    </div>

    </div>
  );
}

export default App;
