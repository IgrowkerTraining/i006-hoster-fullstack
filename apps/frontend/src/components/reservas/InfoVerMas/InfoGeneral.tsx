import React from 'react'

const InfoGeneral: React.FC = () => {
    return (
        <div className='mt-4'>
            <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
                Información general
            </h2>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div>
                    <span className="">Recepcionista:</span>{" "}
                    <span>Laura Martínez</span>
                </div>

                <div>
                    <span className="">Canal:</span>{" "}
                    <span>Directa (teléfono)</span>
                </div>

                <div>
                    <span className="">ID de la reserva:</span>{" "}
                    <span>HSTR-2026-009203</span>
                </div>
            </div>

        </div>
    )
}

export default InfoGeneral