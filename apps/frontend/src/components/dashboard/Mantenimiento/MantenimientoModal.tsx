import React, { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import type { MaintenanceItem } from "@/src/types/dashboard";
import BaseModal from "../../common/modals/BaseModal";
import MiniBarTabs from "../../common/tabs/MiniBarTabs";
import MantenimientoList from "./MantenimientoList";
import { filterByTab } from "@/src/utils/filterByTab";
import { formatDateToYmd } from "@/src/utils/date/formatDateToYmd";

type Props = {
    open: boolean;
    onClose: () => void;
    items: MaintenanceItem[];
};

const MantenimientoModal: React.FC<Props> = ({ open, onClose, items }) => {
    const tabs = ["Vista global", "Limpieza", "Mantenimiento"] as const;
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]>("Vista global");

    const [date, setDate] = useState(() => formatDateToYmd(new Date()));

    const filteredByTab = useMemo(() => {
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
                        Mantenimiento
                    </h2>

                    <button
                        type="button"
                        title="Actualizar"
                        className="p-1 bg-[var(--light-main)] rounded-md"
                        onClick={() => console.log("refresh mantenimiento")}
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
            {/* Mini bar en el modal */}
            <MiniBarTabs
                tabs={tabs}
                value={activeTab}
                onChange={setActiveTab}
                className="mb-3"
            />

            <MantenimientoList
                items={filteredByTabAndDate}
                maxHeightClassName="max-h-[70vh]"
            />
        </BaseModal>
    );
};

export default MantenimientoModal;