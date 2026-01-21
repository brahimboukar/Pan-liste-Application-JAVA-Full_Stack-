import HeaderBar from "../../Components/Layout/HeaderBar";
import NavBar from "../../Components/Layout/NavBar";
import TablePaneliste from "../../Components/Tables/TablePaneliste";

export default function Paneliste() {
    return (
    <div className="flex h-screen bg-gray-50">
    
    <NavBar />
      
      <div className="flex-1 overflow-auto">
       
        <HeaderBar />

       
        <div className="p-8">
          <TablePaneliste />
        </div>
      </div>
    </div>
  );
};