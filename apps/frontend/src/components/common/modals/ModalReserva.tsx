import React, { useState, useEffect } from "react";
import {
  X,
  UserRound,
  Phone,
  IdCard,
  Mail,
  UsersRound,
  ArrowUpRight,
} from "lucide-react";
import ModalCheckIn from "./ModalCheckIn";
import ModalCheckOut from "./ModalCheckOut";
import ModalAgregarServicio from "./ModalAgregarServicio";

import { useNavigate } from "react-router-dom";

export interface Reserva {
  id: string;
  nombre: string;
  telefono: string;
  documento: string;
  email: string;
  habitacion: string;
  personas: number;
  fechaLlegada: string;
  fechaSalida: string;
  pago: string;
  serviciosAdicionales: number;
  nota: string;
}

interface ModalReservaProps {
  reserva: Reserva;
  onClose: () => void;
}

function useTheme(): "light" | "dark" {
  const getTheme = (): "light" | "dark" => {
    if (typeof document === "undefined") return "light";
    if (
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark")
    )
      return "dark";
    return "light";
  };
  const [theme, setTheme] = useState<"light" | "dark">(getTheme);
  useEffect(() => {
    const update = () => setTheme(getTheme());
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

const SvgIcon: React.FC<{ name: string; alt: string; theme: "light" | "dark" }> = ({
  name, alt, theme,
}) => {
  const suffix = theme === "dark" ? "light" : "dark";
  return (
    <img src={`/icons/${name}-${suffix}.svg`} alt={alt} width={16} height={16}
      style={{ display: "block" }} />
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-[10px] text-[14px] text-[var(--light-text)]">
    <span className="shrink-0 flex items-center opacity-80">{icon}</span>
    <span>{text}</span>
  </div>
);


const IconNota: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 1.5 H3.5 A1 1 0 0 0 2.5 2.5 V13.5 A1 1 0 0 0 3.5 14.5 H12.5 A1 1 0 0 0 13.5 13.5 V5 L10 1.5 Z" />
    <polyline points="10,1.5 10,5 13.5,5" />
  </svg>
);

type SubModal = "checkin" | "checkout" | "agregarservicio" | null;

const ModalReserva: React.FC<ModalReservaProps> = ({ reserva, onClose }) => {
  const theme = useTheme();
  const [subModal, setSubModal] = useState<SubModal>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const navigate = useNavigate();

  const handleVerMas = () => {
    setSubModal(null);
    onClose();
    navigate(`/reservas/${reserva.id}`);
  };

  const acciones = [
    "Check-In",
    "Check-Out",
    "Agregar Servicio",
    "Editar Reserva",
    "Cancelar Reserva",
  ];

  const handleAccion = (label: string) => {
    if (label === "Check-In") { setSubModal("checkin"); return; }
    if (label === "Check-Out") { setSubModal("checkout"); return; }
    if (label === "Agregar Servicio") { setSubModal("agregarservicio"); return; }
    console.log(label);
  };

  return (
    <>
      <style>{`
        @keyframes mr-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes mr-slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .mr-overlay { animation: mr-fadeIn  0.2s ease; }
        .mr-card    { animation: mr-slideUp 0.25s cubic-bezier(.22,.68,0,1.2); }
      `}</style>

      {/* Modal principal */}
      {subModal === null && (
        <div
          className="mr-overlay fixed inset-0 z-[1000] flex items-center justify-center p-4
                     bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
          onClick={handleOverlayClick}
        >
          <div
            className="mr-card relative w-full max-w-[760px] rounded-[20px]
                       bg-[var(--light-card)]
                       shadow-[0_24px_64px_rgba(84,81,255,0.18)]
                       dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)]
                       text-[var(--light-text)]
                       px-10 pt-9 pb-7"
            role="dialog"
            aria-modal="true"
          >
            <h2 className="font-poppins font-bold text-[28px] text-[var(--light-text)] m-0 mb-6">
              Reserva #{reserva.id}
            </h2>

            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-5 right-5 flex items-center justify-center
                         w-8 h-8 rounded-lg border-none bg-transparent
                         text-[var(--light-text)] opacity-60 cursor-pointer
                         hover:opacity-100 hover:bg-[var(--light-main2)]
                         transition-all duration-200"
            >
              <X size={20} />
            </button>

            <div className="flex flex-wrap gap-[10px] mb-8">
              {acciones.map((label) => (
                <button
                  key={label}
                  className="h-9 px-5 rounded-[20px] border-none
                             bg-[var(--light-main2)] text-[var(--light-text)]
                             font-poppins text-[13px] font-semibold cursor-pointer
                             whitespace-nowrap
                             hover:bg-[var(--light-main)] hover:-translate-y-px
                             active:translate-y-0
                             transition-all duration-200"
                  onClick={() => handleAccion(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-[18px] mb-6
                            max-[520px]:grid-cols-1">
              <InfoRow icon={<UserRound size={16} />} text={reserva.nombre} />
              <InfoRow icon={<IdCard size={16} />} text={reserva.documento} />
              <InfoRow icon={<Phone size={16} />} text={reserva.telefono} />
              <InfoRow icon={<Mail size={16} />} text={reserva.email} />
              <InfoRow icon={<SvgIcon name="alojamiento" alt="Alojamiento" theme={theme} />}text={`Alojamiento: ${reserva.habitacion}`}/>
              <InfoRow icon={<UsersRound size={16} />} text={`${reserva.personas} personas`} />
              <InfoRow
                icon={<SvgIcon name="fecha-llegada" alt="Fecha llegada" theme={theme} />}
                text={`Fecha llegada: ${reserva.fechaLlegada}`}
              />
              <InfoRow
                icon={<SvgIcon name="fecha-salida" alt="Fecha salida" theme={theme} />}
                text={`Fecha salida: ${reserva.fechaSalida}`}
              />
              <InfoRow
                icon={<SvgIcon name="pago" alt="Pago" theme={theme} />}
                text={`Pago: ${reserva.pago}`}
              />
              <InfoRow
                icon={<SvgIcon name="servicios" alt="Servicios adicionales" theme={theme} />}
                text={`Servicios adicionales: ${reserva.serviciosAdicionales}`}
              />
              <InfoRow icon={<IconNota />} text={`Nota:  ${reserva.nota}`} />
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--light-outline)]">
              <button
                onClick={handleVerMas}
                className="inline-flex items-center gap-[5px] border-none bg-transparent
                           font-poppins text-[13px] font-semibold cursor-pointer p-0
                           text-[var(--light-text)] opacity-70
                           hover:opacity-100 transition-opacity duration-200"
              >
                <ArrowUpRight size={14} />
                Ver más
              </button>
            </div>
          </div>
        </div>
      )}

      {subModal === "checkin" && (
        <ModalCheckIn reserva={reserva} onClose={onClose} onBack={() => setSubModal(null)} />
      )}

      {subModal === "checkout" && (
        <ModalCheckOut reserva={reserva} onClose={onClose} onBack={() => setSubModal(null)} />
      )}

      {subModal === "agregarservicio" && (
        <ModalAgregarServicio reserva={reserva} onClose={onClose} onBack={() => setSubModal(null)} />
      )}
    </>
  );
};

export default ModalReserva;