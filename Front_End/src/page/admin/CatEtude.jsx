import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {Layers} from "lucide-react";
import CatRecomponseTable from "../../components/table/CatRecomponseTable.jsx";
import CatEtudeTable from "../../components/table/CatEtudeTable.jsx";

function CatEtude() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <CartTitle
                    icons={<Layers size={20} strokeWidth={2.1} className="text-white" />}
                    title="Catégorie Etude"
                    sousTitle="Gérez facilement vos catégories Etude"
                />
            </div>
            <CatEtudeTable/>
        </>
    );
}

export default CatEtude;