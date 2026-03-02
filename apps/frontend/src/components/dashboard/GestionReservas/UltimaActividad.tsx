import React, { useState, useMemo } from "react";
import dataJson from "../../../data/data.json";
import type { DashboardData, UltimaActividadItem } from "../../../types/dashboard";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import DashboardCardHeader from "../../common/header/DashboardCardHeader";
import UltimaActividadList from "./UltimaActividadList";
import UltimaActividadModal from "./UltimaActividadModal";

const UltimaActividad: React.FC = () => {
    const tabs = ["Vista global", "Nuevas reservas", "Cancelación", "Modificación"] as const;
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]>("Vista global");

    const [openModal, setOpenModal] = useState(false);

    const data = dataJson as unknown as DashboardData;
    const items: UltimaActividadItem[] = data?.ultimasActividades ?? [];

    const filtered = useMemo(() => {
        return filterByTab(
            items,
            activeTab,
            {
                "Nuevas reservas": (x) => x.tipo === "Nueva reserva",
                "Cancelación": (x) => x.tipo === "Cancelación",
                "Modificación": (x) => x.tipo === "Modificación",
            },
            "Vista global"
        );
    }, [items, activeTab]);

    const lastFive = useMemo(() => filtered.slice(0, 5), [filtered]);

    return (
        <div className="bg-[var(--card)] rounded-xl p-1 h-full">
            <DashboardCardHeader
                title="Gestión de reservas"
                onRefresh={() => console.log("refresh gestion de reservas")}
                onViewMore={() => setOpenModal(true)}
            />

            <MiniBarTabs tabs={tabs} value={activeTab} onChange={setActiveTab} className="mb-2" />

            {/* Dashboard: últimos 5 */}
            <UltimaActividadList items={lastFive} maxHeightClassName="max-h-[420px]" />

            {/* Modal: todos */}
            <UltimaActividadModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                items={filtered}
            />
        </div>
    );
};

export default UltimaActividad;