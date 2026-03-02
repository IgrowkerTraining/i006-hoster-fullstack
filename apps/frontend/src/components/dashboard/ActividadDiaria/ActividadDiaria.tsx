import React, { useState, useMemo } from "react";
import { RefreshCcw, ArrowUpRight } from "lucide-react";
import CardActividadDiaria from "./CardActividadDiaria";
import dataJson from "../../../data/data.json"
import type { DashboardData, ActividadDiariaItem } from "../../../types/dashboard";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import DashboardCardHeader from "../../common/header/DashboardCardHeader";
import ActividadDiariaList from "./ActividadDiariaList";
import ActividadDiariaModal from "./ActividadDiariaModal"

const ActividadDiaria: React.FC = () => {
  const tabs = ["Vista global", "Check-In", "Check-Out", "Servicios asignados"] as const
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Vista global")

  const data = dataJson as unknown as DashboardData;
  const items: ActividadDiariaItem[] = data?.actividadDiaria ?? [];

  const [openModal, setOpenModal] = useState(false);

  const filtered = useMemo(() => {
    return filterByTab(
      items,
      activeTab,
      {
        "Check-In": (x) => x.estado === "Check-in",
        "Check-Out": (x) => x.estado === "Check-out",
        "Servicios asignados": (x) => (x.serviciosAdicionales.cantidad ?? 0) >= 1,
      },
      "Vista global"
    );
  }, [items, activeTab]);

  const lastFive = useMemo(() => filtered.slice(0, 5), [filtered]);

  return (
    <div className="bg-[var(--light-card)] rounded-xl p-1 h-full">

      {/* Header */}
      <DashboardCardHeader
        title="Actividad diaria"
        onRefresh={() => console.log("refresh actividad diaria")}
        onViewMore={() => setOpenModal(true)}
      />

      {/* Mini barra */}
      <MiniBarTabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
        className="mb-2"
      />

      {/* Contenido: en dashboard los ultimos 5*/}
      <ActividadDiariaList items={lastFive} maxHeightClassName="max-h-[420px]" />


      {/* Modal: todos */}
      <ActividadDiariaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        items={filtered}
      />

    </div>
  );
};

export default ActividadDiaria;
