import React from 'react'
import { RefreshCcw } from "lucide-react";
import ChartsOcupacion from '../charts/ChartsOcupacion';

const Ocupacion: React.FC = () => {
    return (
        <div className="bg-[var(--light-card)] rounded-xl p-1 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="font-poppins font-medium text-[20px] text-[var(--light-text)]">
                    Ocupación

                    <button
                        type="button"
                        title="Actualizar"
                        className="ml-3 p-1 bg-[var(--light-main)] rounded-md"
                        onClick={() => { console.log("refresh actividad diaria") }}
                    >
                        <RefreshCcw size={16} />
                    </button>
                </h2>
            </div>

            {/* Filtro de fecha */}
            <div className="flex items-center gap-3 mb-3 px-1">
                <span className="font-poppins text-[16px] text-[var(--light-text)]">
                    Fecha:
                </span>

                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2  rounded-lg border border-[var(--light-outline)] bg-[var(--light-bg)] text-[16px] font-poppins text-[var(--light-text)] hover:bg-[var(--light-main2)] transition ">
                    02/02/2026
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-[var(--light-text)]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </button>
            </div>

            <ChartsOcupacion />
        </div>
    )
}

export default Ocupacion