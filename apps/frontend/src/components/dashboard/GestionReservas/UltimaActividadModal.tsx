import React, { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import type { UltimaActividadItem } from "../../../types/dashboard";
import BaseModal from "../../common/modals/BaseModal";
import UltimaActividadList from "./UltimaActividadList";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { filterByTab } from "@/src/utils/filterByTab";
import { formatDateToYmd } from "@/src/utils/date/formatDateToYmd";

type Props = {
  open: boolean;
  onClose: () => void;
  items: UltimaActividadItem[];
};

const UltimaActividadModal: React.FC<Props> = ({ open, onClose, items }) => {
  const tabs = ["Vista global", "Nuevas reservas", "Cancelación", "Modificación"] as const;
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Vista global");

  const [date, setDate] = useState(() => formatDateToYmd(new Date()));

  /** 1️⃣ filtro por tab */
  const filteredByTab = useMemo(() => {
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

  /** 2️⃣ filtro por fecha (cuando exista el campo real) */
  const filteredByTabAndDate = useMemo(() => {
    // cuando tengas el campo real:
    // return filteredByTab.filter(x => x.fecha === date)
    return filteredByTab;
  }, [filteredByTab, date]);

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      headerSlot={
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="font-poppins font-medium text-[20px] text-[var(--light-text)]">
            Gestión de reservas
          </h2>

          <button
            type="button"
            title="Actualizar"
            className="p-1 bg-[var(--light-main)] rounded-md"
            onClick={() => console.log("refresh gestion de reservas")}
          >
            <RefreshCcw size={16} />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-poppins text-sm text-[var(--light-text)] opacity-70">
              Fecha
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 rounded-lg px-3 font-poppins text-sm
                         bg-white/60 border border-black/10
                         text-[var(--light-text)] outline-none"
            />
          </div>
        </div>
      }
    >
      {/* ✅ Mini bar en el modal */}
      <MiniBarTabs
        tabs={tabs}
        value={activeTab}
        onChange={setActiveTab}
        className="mb-3"
      />

      <UltimaActividadList
        items={filteredByTabAndDate}
        maxHeightClassName="max-h-[70vh]"
      />
    </BaseModal>
  );
};

export default UltimaActividadModal;