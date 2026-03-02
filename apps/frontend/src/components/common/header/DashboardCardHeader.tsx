import React from "react";
import { RefreshCcw, ArrowUpRight } from "lucide-react";

type DashboardCardHeaderProps = {
  title: string;
  onRefresh?: () => void;
  onViewMore?: () => void;

  refreshTitle?: string;
  viewMoreLabel?: string;

  hideRefresh?: boolean;
  hideViewMore?: boolean;

  /**
   * Slot que se muestra a la derecha del botón Refresh
   * (fecha, filtros, search, etc.)
   */
  rightSlot?: React.ReactNode;
};

const DashboardCardHeader: React.FC<DashboardCardHeaderProps> = ({
  title,
  onRefresh,
  onViewMore,
  refreshTitle = "Actualizar",
  viewMoreLabel = "Ver más",
  hideRefresh = false,
  hideViewMore = false,
  rightSlot,
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      {/* IZQUIERDA: título + refresh + filtros */}
      <div className="flex items-center gap-3">
        <h2 className="font-poppins font-medium text-[20px] text-[var(--light-text)]">
          {title}
        </h2>

        {!hideRefresh && (
          <button
            type="button"
            title={refreshTitle}
            className="p-1 bg-[var(--light-main)] rounded-md"
            onClick={onRefresh}
          >
            <RefreshCcw size={16} />
          </button>
        )}

        {rightSlot}
      </div>

      {/* DERECHA: Ver más (solo si NO está oculto) */}
      {!hideViewMore && (
        <button
          type="button"
          className="flex items-center gap-2 font-poppins font-medium text-[16px] text-[var(--light-text)]"
          onClick={onViewMore}
        >
          <ArrowUpRight size={16} />
          {viewMoreLabel}
        </button>
      )}
    </div>
  );
};

export default DashboardCardHeader;