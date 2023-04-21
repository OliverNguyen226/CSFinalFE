import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Paint from "./Paint";
import Login from "./Login";

export default function App() {
  const [user, setUser] = useState();
  // if (!user) {
  //   return <Login setUser={setUser} />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paint/:id" element={<Paint />} />
      </Routes>
    </BrowserRouter>
  );
}
