import React from 'react';
import CartTitle from "../../components/cart/CartTitle.jsx";
import {Users2} from "lucide-react";
import UsersTable from "../../components/table/UsersTable.jsx";

function Users() {
    return (
        <>
            <div className="flex justify-between items-center">
                <CartTitle
                    icons={<Users2 size={20} strokeWidth={2.1} className="text-white" />}
                    title="Gestion Des Panélistes"
                    sousTitle="Gérez facilement vos Panélistes"
                />
            </div>
            <UsersTable />
        </>
    );
}

export default Users;