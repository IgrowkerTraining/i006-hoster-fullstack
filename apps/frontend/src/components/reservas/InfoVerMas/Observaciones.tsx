import React from 'react'
import { StickyNote } from "lucide-react";

const Observaciones: React.FC = () => {
    return (
        <div className='mt-4'>
            <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
                Observaciones
            </h2>

            <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
                <div className="flex items-center gap-2">
                   <StickyNote size={16} />
                    <span className="">Nota del recepcionista:</span>
                    <span>-</span>
                </div>
            </div>
        </div>
    )
}

export default Observaciones