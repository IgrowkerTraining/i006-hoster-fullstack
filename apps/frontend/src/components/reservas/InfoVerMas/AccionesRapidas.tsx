import React from "react";
import NavActionButton from "../../common/Navigation/NavActionButton";

interface Props {
    reservaId: string;
    onCheckIn: () => void;
    onCheckOut: () => void;
    onAgregarServicio: () => void;
    onEditar: () => void;
    onCancelar: () => void;
}

const AccionesRapidas: React.FC<Props> = ({
    reservaId,
    onCheckIn,
    onCheckOut,
    onAgregarServicio,
    onEditar,
    onCancelar,
}) => {
    const samePage = `/reservas/${reservaId}`;

    const btnClass = "h-11 shrink-0 bg-[var(--light-main2)] hover:bg-[var(--light-main)] text-[var(--light-text)]";

    return (
        <div className="flex gap-3 overflow-x-auto pb-1">
            <NavActionButton
                to={samePage}
                label="Check-in"
                onClick={onCheckIn}
                className={btnClass}
            />
            <NavActionButton
                to={samePage}
                label="Check-out"
                onClick={onCheckOut}
                className={btnClass}
            />
            <NavActionButton
                to={samePage}
                label="Agregar servicio"

                onClick={onAgregarServicio}
                className={btnClass}
            />
            <NavActionButton
                to={samePage}
                label="Editar reserva"
                onClick={onEditar}
                className={btnClass}
            />
            <NavActionButton
                to={samePage}
                label="Cancelar reserva"
                onClick={onCancelar}
                className={btnClass}
            />
        </div>
    );
};

export default AccionesRapidas;