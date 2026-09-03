import Home from "./page/landing/Home.jsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/index.jsx";


function App() {

     return <RouterProvider router={router} />

}

export default App
