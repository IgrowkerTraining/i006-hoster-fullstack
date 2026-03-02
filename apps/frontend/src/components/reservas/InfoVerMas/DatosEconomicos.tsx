import React from 'react'
import { DollarSign, Receipt } from "lucide-react";

const DatosEconomicos = () => {
  return (
    <div className='mt-4'>
      <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
        Datos económicos
      </h2>
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span className="">Precio por noche:</span>
          <span>100 USD</span>
        </div>

        <div className="flex items-center gap-2">
          <Receipt size={16} />
          <span className="">Precio total por noche:</span>{" "}
          <span>900 USD</span>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span className="">Precio por servicios:</span>
          <span>100 USD</span>
        </div>

        <div className="flex items-center gap-2">
          <Receipt size={16} />
          <span className="">Total estimado de la estadía:</span>{" "}
          <span>1000 USD</span>
        </div>
      </div>
    </div>
  )
}

export default DatosEconomicos