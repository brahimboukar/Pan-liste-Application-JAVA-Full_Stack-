import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {CalendarSync} from "lucide-react";
import EvenementsTable from "../../components/table/EvenementsTable.jsx";

function Evenement() {
    return (
        <>
            <div className="flex justify-between items-center">
                <CartTitle
                    icons={<CalendarSync size={20} strokeWidth={2.1} className="text-white" />}
                    title="Evénements"
                    sousTitle="Gérez facilement vos Evénements"
                />

            </div>
            <EvenementsTable />
        </>
    );
}

export default Evenement;