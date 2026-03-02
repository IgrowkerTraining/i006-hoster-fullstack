import React from 'react'
import { User, MapPinned, IdCard, Phone, Mail } from "lucide-react"

const DatosHuesped: React.FC = () => {
    return (
        <div className='mt-4'>
            <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
                Datos del huésped
            </h2>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                    <User size={16} className="" />
                    <span className="">Nombre completo:</span>
                    <span>Laura Peréz</span>
                </div>

                <div className="flex items-center gap-2">
                    <MapPinned size={16} />
                    <span className="">País:</span>{" "}
                    <span>Argentina</span>
                </div>

                <div className="flex items-center gap-2">
                    <IdCard size={16} />
                    <span className="">Tipo de documento:</span>{" "}
                    <span>DNI</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span className="">Email:</span>{" "}
                    <span>laura.perez@gmail.com</span>
                </div>

                <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span className="">Teléfono:</span>{" "}
                    <span>+54 9 261123456</span>
                </div>

                <div className="flex items-center gap-2">
                    <IdCard size={16} />
                    <span className="">Número de identidad:</span>{" "}
                    <span>24765419</span>
                </div>
            </div>
        </div>
    )
}

export default DatosHuesped