import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dash from "./Pages/Admin/Dash";
import Recomponse from "./Pages/Panéliste/Recomponse";

export default function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/inscreption" element={<Register />} />


      <Route path="/dashbord" element={
        <PrivateRoute adminOnly={true}>
        <Dash />
        </PrivateRoute>
      }/>


      <Route path="/recomponse" element={
        <PrivateRoute userOnly={true}>
        <Recomponse />
        </PrivateRoute>
      }/>
    </Routes>
  </BrowserRouter>
  );
}
