import React, { useState } from "react";
import DashboardActions from "./DashboardActions";
import BuscarReserva from "./BuscarReserva";

const AccionesRapidas: React.FC = () => {
    const [q, setQ] = useState("");
    return (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 w-full">
            {/* 60% */}
            <div className="border border-slate-200 rounded-xl p-4 bg-[var(--card)] shadow-sm">
                <BuscarReserva />
            </div>

            {/* 40% */}
            <div className="p-4">
                <DashboardActions />
            </div>
        </div>
    );
};

export default AccionesRapidas;