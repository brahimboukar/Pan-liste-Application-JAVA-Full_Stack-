import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import Dash from "./Pages/Admin/Dash";
import Recomponse from "./Pages/Panéliste/Recomponse";
// import { useEffect } from "react";
import Authentication from "./Services/Authentication";
import Paneliste from "./Pages/Admin/Paneliste";

export default function App() {
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     Authentication.logout();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/inscreption" element={<Register />} />


      <Route path="/dashboard" element={
        <PrivateRoute adminOnly={true}>
        <Dash />
        </PrivateRoute>
      }/>
      <Route path="/panéliste" element={
        <PrivateRoute adminOnly={true}>
        <Paneliste />
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
