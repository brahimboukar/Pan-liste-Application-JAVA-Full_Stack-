import { MoreHorizontal, Wallet } from 'lucide-react'
import React from 'react'
import CountUp from "react-countup";

function CardDash({titre,icon:Icon,nember}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                     {Icon && <Icon className="text-indigo-600" size={20} />}
                    </div>
                    <span className="text-sm text-gray-600">{titre}</span>
                  </div>
                  <button className="text-gray-400">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                    <CountUp start={0} end={nember} duration={3} />
                  </span>
                </div>
                
    </div>
  )
}

export default CardDash
