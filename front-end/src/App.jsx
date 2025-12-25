import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";

export default function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/inscreption" element={<Register />} />
    </Routes>
  </BrowserRouter>
  );
}
