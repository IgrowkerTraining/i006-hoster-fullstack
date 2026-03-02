import React from 'react'
import { CreditCard, DollarSign, Barcode } from "lucide-react";

const FormaPago: React.FC = () => {
    return (
        <div className='mt-4'>
            <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
                Formas de pago
            </h2>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span className="">Estado del pago:</span>
                    <span>Parcial</span>
                </div>

                <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    <span className="">Medio de pago:</span>{" "}
                    <span>Tarjeta de crédito</span>
                </div>
            </div>


            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span className="">Monto pendiente:</span>
                    <span>200 USD</span>
                </div>

                <div className="flex items-center gap-2">
                    <DollarSign size={16} />
                    <span className="">Monto que abona ahora:</span>{" "}
                    <span>800 USD</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                    <Barcode size={16} />
                    <span className="">Número de recibo/transacción:</span>
                    <span>1478</span>
                </div>
            </div>
        </div>
    )
}

export default FormaPago