import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Authentication/Login";

export default function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}
