import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {CircleStar} from "lucide-react";
import RecomponseTable from "../../components/table/RecomponseTable.jsx";

function AdminRecomponses() {
    return (
        <>
            <div className="flex justify-between items-center">
                <CartTitle
                    icons={<CircleStar size={20} strokeWidth={2.1} className="text-white" />}
                    title="Récomponses"
                    sousTitle="Gérez facilement vos Récomponses"
                />

            </div>
            <RecomponseTable />
        </>
    );
}

export default AdminRecomponses;