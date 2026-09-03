import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {Layers} from "lucide-react";
import CatRecomponseTable from "../../components/table/CatRecomponseTable.jsx";


function CatRecomponse() {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <CartTitle
                    icons={<Layers size={20} strokeWidth={2.1} className="text-white" />}
                    title="Catégorie Récomponses"
                    sousTitle="Gérez facilement vos catégories Récomponses"
                />
            </div>
            <CatRecomponseTable/>
        </>
    );
}

export default CatRecomponse;