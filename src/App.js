import { useEffect, useState } from "react";
import { db, auth } from "./firebaseConnection";
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

import './app.css';

function App() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [idPosts, setIdPosts] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [posts, setPosts] = useState([]);


    useEffect(() => { //Atualizar a pagina automatico.
      async function loadPosts() {
        const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
           let listaPost = [];

    snapshot.forEach((doc) => {
      listaPost.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor,
      })
      
    })
      setPosts(listaPost);
        })
      }
      loadPosts();
    }, [])

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

    /* const postRef = doc(db, "posts", "12345")

    await getDoc(postRef)
    .then((snapshot) => {
        setAutor(snapshot.data().autor)
        setTitulo(snapshot.data().titulo)
    })
    .catch(() => {
      console.log ("Deu error")
    }) */
  

  const postRef = collection(db, "posts")
  await getDocs(postRef)
  .then((snapshot) => {
    let lista = [];

    snapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        titulo: doc.data().titulo,
        autor: doc.data().autor,
      })
      
    })
      setPosts(lista);
   
    })
    .catch((error) => {
      console.log("Deu error ao buscar")

  })

} 

async function editarPost() {
  const docRef = doc(db, "posts", idPosts)
  await updateDoc(docRef, {
    titulo: titulo,
    autor: autor
  })
  .then (() => {
    setIdPosts('')
    setTitulo('')
    setAutor('')
  })
  .catch(() => {
      console.log ("Deu error")
  })
  

}


async function excluirPost(id) {
  const docRef = doc(db, "posts", id)
  await deleteDoc(docRef)
  .then(() => {
    alert("Post Deletado!")
  })
}

async function novoUsuario(){
  await createUserWithEmailAndPassword(auth, email, senha )
  .then(() => {
    console.log("Cadastrado com sucesso!")
    setEmail('')
    setSenha('')
  })
  .catch((error) => {
    if(error.code === 'auth/weak-password'){
      alert('Senha muito fraca.')
    }else if(error.code === 'auth/email-already-in-use'){
      alert("Email ja existe!")
    }
  })
}

  return (
    <div>
      <h1>Firebase</h1>

    <div className="container">
      <h2>Usuarios</h2>
      <label>Email</label>
      <input 
      value={email}
      onChange={(e) => setEmail(e.target.value) }
      placeholder="Digite um email"
      /> 
      <br />
      <label>Senha</label>
      <input 
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
      placeholder="Digite uma senha"
      />

    <button onClick={novoUsuario}>Cadastrar</button>

    </div>

    <br /><br />

       <hr />



    <div className="container">
      <h2>Posts</h2>

    <label>ID do Post:</label>
    <input 
      placeholder="Digite o ID do post"
      value={idPosts}
      onChange={ (e) => setIdPosts(e.target.value) }
    
    /> <br/>


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

      <button onClick={editarPost}>Atualizar Post</button>

      <ul>
        {posts.map( (post) => {
          return(
            <li key={post.id}>
              <strong>ID: {post.id} </strong><br/>
              <span>Titulo: {post.titulo} </span> <br/>
              <span>Autor: {post.autor} </span> <br />
              <button onClick={ () => excluirPost(post.id) }>Excluir</button> <br />
            </li>
          )
        })}
      </ul>

    </div>

    </div>
  );
}

export default App;
