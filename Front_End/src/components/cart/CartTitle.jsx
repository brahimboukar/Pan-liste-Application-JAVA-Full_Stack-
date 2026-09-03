import React from 'react';
import {Layers} from "lucide-react";

function CartTitle({title,icons,sousTitle}) {
    return (
        <div className="inline-flex items-center gap-2 p-3 rounded-xl bg-slate-950 shadow-md">
            {icons}

            <div>
                <h1 className="text-sm font-medium text-white">
                    {title}
                </h1>
                <p className="text-xs text-blue-100">
                    {sousTitle}
                </p>
            </div>
        </div>
    );
}

export default CartTitle;