import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDl-YShnXUmhkQifzK18E4V5EcypANpCLU",
  authDomain: "apoc-jst.firebaseapp.com",
  projectId: "apoc-jst",
  storageBucket: "apoc-jst.appspot.com",
  messagingSenderId: "581394615135",
  appId: "1:581394615135:web:9f97c35d738e752812c4ea",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
