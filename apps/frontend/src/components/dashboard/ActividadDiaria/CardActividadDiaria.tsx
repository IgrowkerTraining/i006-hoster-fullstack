import React from "react";
import { UserCheck, UserMinus, User, Users, Banknote, ClockArrowUp, MoreVertical, BedDouble, HandPlatter, CalendarArrowDown, CalendarArrowUp, Car } from "lucide-react";

const CardActividadDiaria: React.FC<{ item: any }> = ({ item }) => {

    const isCheckIn = item.estado === "Check-in";

    const labelHora = isCheckIn ? "Llegada estimada" : "Salida estimada";
    const hora = isCheckIn ? item.horarioEstimado?.llegada : item.horarioEstimado?.salida;

    const parkingLabel = item.serviciosAdicionales.parking ? "Sí" : "No";

    return (
        <div className="border-b border-[#D4D4D4] py-3">
            <div className="grid grid-cols-[38px_1.2fr_1.4fr_1.4fr_32px] gap-3 font-poppins">
                <div className="flex justify-start items-start pt-1">
                    <div className="w-10 h-10 rounded-full bg-[var(--light-main2)] flex items-center justify-center">
                        {isCheckIn ? (
                            <UserCheck size={18} className="text-[var(--light-text)]" />
                        ) : (
                            <UserMinus size={18} className="text-[var(--light-text)]" />
                        )}
                    </div>
                </div>

                <div className="text-start">
                    <p className="text-[16px] font-bold text-[var(--light-text)]">Reserva # {item.reservaId}</p>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[var(--light-main)] rounded-xl text-[10px] font-light text-[[var(--light-text)]">
                            {item.estado}
                        </span>

                        <span
                            style={{
                                backgroundColor:
                                    item.estadoDetalle === "Pendiente"
                                        ? "color-mix(in srgb, var(--light-status-pending) 20%, transparent)"
                                        : "color-mix(in srgb, var(--light-status-completed) 20%, transparent)",
                                borderColor:
                                    item.estadoDetalle === "Pendiente"
                                        ? "var(--light-status-pending)"
                                        : "var(--light-status-completed)",
                            }}
                            className="px-3 py-1 rounded-xl text-[10px] font-light text-[var(--light-text)] border"
                        >
                            {item.estadoDetalle}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <User size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] text-[var(--light-text)] font-light">
                            {item.cliente.nombre}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Users size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] text-[var(--light-text)] font-light">
                            {item.personas} {item.personas === 1 ? "persona" : "personas"}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Banknote size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] text-[var(--light-text)] font-light">
                            Pago: {item.pago}
                        </p>
                    </div>
                </div>

                <div className="text-start">
                    <div className="h-[50px]" />   {/* Spacer para alinear con "Cliente" */}
                    <div className="flex items-center gap-2 mt-1">
                        <ClockArrowUp size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">{labelHora}: {hora ?? "—"}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <BedDouble size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">Habitación: {item.habitacion}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <HandPlatter size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">Servicios adicionales: {item.serviciosAdicionales.cantidad}</p>
                    </div>
                </div>

                <div className="text-center">
                    <div className="h-[50px]" />   {/* Spacer para alinear con "Cliente" */}
                    <div className="flex items-center gap-2 mt-1">
                        <CalendarArrowDown size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">Fecha llegada: {item.fechas.llegada}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <CalendarArrowUp size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">Fecha salida: {item.fechas.salida}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <Car size={14} className="text-[var(--light-text)]" />
                        <p className="text-[14px] font-light text-[var(--light-text)]">Parking: {parkingLabel}</p>
                    </div>

                </div>

                <div className="flex justify-center items-start pt-1">
                    <MoreVertical size={18} className="text-[var(--light-text)] cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default CardActividadDiaria;
