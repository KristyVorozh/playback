import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./modules/pages/Main/Main";
import ItemMovie from "./modules/pages/ItemMovie/ItemMovie";
import SignIn from "./modules/pages/SignIn/SignIn";
import { SignUp } from "./modules/pages/SignUp/SignUp";
import { Favorite } from "./modules/pages/Favorite/Favorite";
import { CheckVideoApi } from "./modules/pages/CheckVideoApi/CheckVideoApi";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/movie" replace />} />
      <Route index path="/" element={<SignIn />} />
        <Route index path="/bsiua523hntv2.txt" element={<CheckVideoApi />} />
      <Route index path="/signUp" element={<SignUp />} />
      <Route index path="/favorite" element={<Favorite />} />
      <Route index path="/movie" element={<Main />} />
      <Route index path="/movie/:itemId" element={<ItemMovie />} />
      <Route index path="/genres/:itemId" element={<Main />} />
    </Routes>
  );
}

export default App;
