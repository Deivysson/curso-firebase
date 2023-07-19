import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAMkHJ8uWyhJ783_TcSD2joWV3LN__ApNA",
    authDomain: "curso-sp-1ab95.firebaseapp.com",
    projectId: "curso-sp-1ab95",
    storageBucket: "curso-sp-1ab95.appspot.com",
    messagingSenderId: "886054141277",
    appId: "1:886054141277:web:69b9176b78fe8699087cb4",
    measurementId: "G-3KB4D0M0JJ"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  export { db };