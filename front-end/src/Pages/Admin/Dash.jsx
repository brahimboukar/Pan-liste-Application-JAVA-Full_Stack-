import { useEffect, useState } from "react";
import CardDash from "../../Components/Card/CardDash";
import HeaderBar from "../../Components/Layout/HeaderBar";
import NavBar from "../../Components/Layout/NavBar";
import { CalendarSync, ChevronRight, CircleStar, ClipboardList, Contact, Filter, HandCoins, Menu, MoreHorizontal, Receipt, Search, SquareMousePointer, TrendingDown, TrendingUp, UserPlus, Users, Wallet } from "lucide-react";
import Dashboard from "../../Services/Dashboard";



const Dash = () => {
  const [nbrUser , setNbrUser] = useState(0)
  const [nbrRecomponse , setNbrRecomponse] = useState(0)
  const [nbrEtude , setNbrEtude] = useState(0)
  const [nbrEvenement , setNbrEvenement] = useState(0)

  const nbrPaneliste = async() => {
    const nbru = await Dashboard.nbrPanéliste()
    return setNbrUser(nbru)
  }
  const nbrReco = async() => {
    const nbreco = await Dashboard.nbrRécomponse()
    return setNbrRecomponse(nbreco)
  }
  const nbrEtu = async() => {
    const nbretu = await Dashboard.nbrEtude()
    return setNbrEtude(nbretu)
  }
  const nbrEven = async() => {
    const nbreve = await Dashboard.nbrEvenement()
    return setNbrEvenement(nbreve)
  }
  useEffect(() => {
    nbrPaneliste()
    nbrReco()
    nbrEtu()
    nbrEven()
  }, []); 
  return (
    <div className="flex h-screen bg-gray-50">
    
    <NavBar />
      
      <div className="flex-1 overflow-auto">
       
        <HeaderBar />

       
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Balance Cards */}
            <div className="lg:col-span-2 grid grid-cols-3 gap-6">
              <CardDash titre="Panélistes" icon={Users}  nember={nbrUser} />
              <CardDash titre="Nouvaux Panélistes" icon={UserPlus}  nember={100} />
              <CardDash titre="Récomponses" icon={CircleStar} nember={nbrRecomponse} />
              <CardDash titre="Demande Récomponses" icon={HandCoins} nember={100} />
              <CardDash titre="Etudes" icon={ClipboardList}  nember={nbrEtude} />
              <CardDash titre="Etudes Cible" icon={SquareMousePointer}  nember={100} />
              <CardDash titre="Evenements" icon={CalendarSync}  nember={nbrEvenement} />
              <CardDash titre="Evenement Participant" icon={Contact}  nember={100} />
              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;