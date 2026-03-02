import React, { useState, useMemo } from "react";
import dataJson from "../../../data/data.json";
import type { MaintenanceItem } from "@/src/types/dashboard";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import DashboardCardHeader from "../../common/header/DashboardCardHeader";

import MantenimientoList from "./MantenimientoList";
import MantenimientoModal from "./MantenimientoModal";

const Mantenimiento: React.FC = () => {
    const tabs = ["Vista global", "Limpieza", "Mantenimiento"] as const;
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]>("Vista global");

    const [openModal, setOpenModal] = useState(false);

    const mantenimiento = (dataJson as any)?.mantenimiento;

    const items: MaintenanceItem[] = Array.isArray(mantenimiento?.items)
        ? mantenimiento.items
        : [];

    const filteredItems = useMemo(() => {
        return filterByTab(
            items,
            activeTab,
            {
                Limpieza: (it) => String(it.tipo) === "Limpieza",
                Mantenimiento: (it) => String(it.tipo) === "Mantenimiento",
            },
            "Vista global"
        );
    }, [items, activeTab]);

    const lastFive = useMemo(() => filteredItems.slice(0, 5), [filteredItems]);

    return (
        <div className="bg-[var(--card)] rounded-xl p-1 h-full">
            <DashboardCardHeader
                title="Mantenimiento"
                onRefresh={() => console.log("refresh mantenimiento")}
                onViewMore={() => setOpenModal(true)}
            />

            <MiniBarTabs
                tabs={tabs}
                value={activeTab}
                onChange={setActiveTab}
                className="mb-2"
            />

            {/* Dashboard: últimos 5 */}
            <MantenimientoList items={lastFive} maxHeightClassName="max-h-[420px]" />

            {/* Modal: todos */}
            <MantenimientoModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                items={filteredItems}
            />
        </div>
    );
};

export default Mantenimiento;