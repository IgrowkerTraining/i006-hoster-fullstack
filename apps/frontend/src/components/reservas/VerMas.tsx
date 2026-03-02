import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AccionesRapidas from "./InfoVerMas/AccionesRapidas";
import InfoGeneral from "./InfoVerMas/InfoGeneral";
import DatosHuesped from "./InfoVerMas/DatosHuesped";
import DatosEstadia from "./InfoVerMas/DatosEstadia";
import ServiciosAdicionales from "./InfoVerMas/ServiciosAdicionales";
import DatosEconomicos from "./InfoVerMas/DatosEconomicos";
import FormaPago from "./InfoVerMas/FormaPago";
import Observaciones from "./InfoVerMas/Observaciones";

const VerMas: React.FC = () => {
    const { id = "" } = useParams();
    const navigate = useNavigate();
    const [subModal, setSubModal] = useState("");

    return (
        <div className="p-6">
            <h1 className="flex items-center gap-3 text-xl font-semibold text-[var(--light-text)]">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center opacity-70 hover:opacity-100 transition"
                    aria-label="Volver"
                >
                    <ArrowLeft size={18} />
                </button>

                <span className="text-[25px] font-normal">Reserva #{id}</span>
            </h1>

            <div className="mt-2 pl-8">
                <AccionesRapidas
                    reservaId={id}
                    onCheckIn={() => setSubModal("checkin")}
                    onCheckOut={() => setSubModal("checkout")}
                    onAgregarServicio={() => setSubModal("agregarservicio")}
                    onEditar={() => console.log("editar")}
                    onCancelar={() => console.log("cancelar")}
                />

                <InfoGeneral />
                <DatosHuesped />
                <DatosEstadia />
                <ServiciosAdicionales />
                <DatosEconomicos />
                <FormaPago />
                <Observaciones />
            </div>
        </div>
    );
};

export default VerMas;