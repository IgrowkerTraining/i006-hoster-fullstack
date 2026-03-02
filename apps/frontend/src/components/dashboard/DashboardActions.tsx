import React from "react";
import { Plus, CircleAlert, Wrench, BrushCleaning } from "lucide-react";
import NavActionButton from "../common/Navigation/NavActionButton";

const DashboardActions: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Fila 1 */}
      <div className="flex items-center justify-between gap-3">
        <NavActionButton
          to="/reservas/nueva"
          label="Nueva reserva"
          icon={<Plus size={16} />}
        />
        <NavActionButton
          to="/incidentes/reporte"
          label="Reporte de incidente"
          icon={<CircleAlert size={16} />}
        />
      </div>

      {/* Fila 2 */}
      <div className="flex items-center justify-between gap-3">
        <NavActionButton
          to="/mantenimiento/reporte"
          label="Reporte de mantenimiento"
          icon={<Wrench size={16} />}
        />
        <NavActionButton
          to="/limpieza/reporte"
          label="Reporte de limpieza"
          icon={<BrushCleaning size={16} />}
        />
      </div>
    </div>
  );
};

export default DashboardActions;