import React, { useMemo, useState } from "react";
import type { ActividadDiariaItem } from "../../../types/dashboard";
import BaseModal from "../../common/modals/BaseModal";
import ActividadDiariaList from "./ActividadDiariaList";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import { RefreshCcw } from "lucide-react";
import { formatDateToYmd } from "@/src/utils/date/formatDateToYmd";
import { filterByTab } from "@/src/utils/filterByTab";

type Props = {
    open: boolean;
    onClose: () => void;
    items: ActividadDiariaItem[];
};

const ActividadDiariaModal: React.FC<Props> = ({ open, onClose, items }) => {
    const tabs = ["Vista global", "Check-In", "Check-Out", "Servicios asignados"] as const;
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]>("Vista global");

    const [date, setDate] = useState(() => formatDateToYmd(new Date()));

    /** 1) filtro por tab */
    const filteredByTab = useMemo(() => {
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

    /** 2) filtro por fecha (cuando tengas el campo real) */
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
                        Actividad diaria
                    </h2>

                    <button
                        type="button"
                        title="Actualizar"
                        className="p-1 bg-[var(--light-main)] rounded-md"
                        onClick={() => console.log("refresh actividad diaria")}
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

            <ActividadDiariaList
                items={filteredByTabAndDate}
                maxHeightClassName="max-h-[70vh]"
            />
        </BaseModal>
    );
};

export default ActividadDiariaModal;