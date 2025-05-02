// firebase.js (caminho: ./img/firebase.js)
const firebaseConfig = {
  apiKey: "AIzaSyCQzwnTcgDPA3ARDuWF6ohVUotmoAjtuNI",
  authDomain: "imgrpgin.firebaseapp.com",
  projectId: "imgrpgin",
  storageBucket: "imgrpgin.appspot.com",
  messagingSenderId: "476452974924",
  appId: "1:476452974924:web:7b05dbaff79cf7d53cdfe9",
  measurementId: "G-Y9RGVQ2XKN"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
