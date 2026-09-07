import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {ClipboardList} from "lucide-react";
import EtudeTable from "../../components/table/EtudeTable.jsx";

function Etude() {
    return (
        <>
            <div className="flex justify-between items-center">
                <CartTitle
                    icons={<ClipboardList size={20} strokeWidth={2.1} className="text-white" />}
                    title="Etudes"
                    sousTitle="Gérez facilement vos Etudes"
                />

            </div>
            <EtudeTable />
        </>
    );
}

export default Etude;