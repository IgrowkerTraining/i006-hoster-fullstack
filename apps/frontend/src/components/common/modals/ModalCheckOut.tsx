import React, { useState, useEffect } from "react";
import {
  X,
  UserRound,
  UsersRound,
  DollarSign,
  IdCard,
} from "lucide-react";
import { Reserva } from "./ModalReserva";
import ModalInfoPago from "./ModalInfoPago";

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
    <img
      src={`/icons/${name}-${suffix}.svg`}
      alt={alt}
      width={16}
      height={16}
      style={{ display: "block" }}
    />
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-[10px] text-[14px] text-[var(--light-text)]">
    <span className="shrink-0 flex items-center opacity-80">{icon}</span>
    <span>{text}</span>
  </div>
);

interface ModalCheckOutProps {
  reserva: Reserva;
  onClose: () => void;
  onBack: () => void;
}

/* ─────────────────────────────────────────────
   Modal Check-Out
───────────────────────────────────────────── */
const ModalCheckOut: React.FC<ModalCheckOutProps> = ({ reserva, onClose, onBack }) => {
  const theme = useTheme();
  const [metodoPago, setMetodoPago] = useState("");
  const [textoPago, setTextoPago] = useState("");
  const [mostrarInfoPago, setMostrarInfoPago] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        @keyframes co-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes co-slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .co-overlay { animation: co-fadeIn 0.2s ease; }
        .co-card    { animation: co-slideUp 0.25s cubic-bezier(.22,.68,0,1.2); }

        .co-select {
          width: 100%;
          height: 44px;
          background: var(--light-main2);
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 40px 0 14px;
          font-family: inherit;
          font-size: 14px;
          color: var(--light-text);
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .co-select:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }

        .co-input {
          width: 100%;
          height: 44px;
          background: var(--light-main2);
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 14px;
          font-family: inherit;
          font-size: 14px;
          color: var(--light-text);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .co-input::placeholder { color: var(--light-placeholder); }
        .co-input:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }

        .co-btn-secondary {
          height: 44px;
          padding: 0 28px;
          border-radius: 22px;
          border: none;
          background: var(--light-main2);
          color: var(--light-text);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .co-btn-secondary:hover { background: var(--light-main); transform: translateY(-1px); }
        .co-btn-secondary:active { transform: translateY(0); }

        .co-btn-primary {
          height: 44px;
          padding: 0 28px;
          border-radius: 22px;
          border: none;
          background: var(--light-accent);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .co-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .co-btn-primary:active { transform: translateY(0); }

        .co-mas-info {
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: var(--light-text);
          text-decoration: underline;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
        }
        .co-mas-info:hover { opacity: 1; }
      `}</style>

      {/* Modal CheckOut — se oculta cuando se abre InfoPago */}
      {!mostrarInfoPago && (
        <div
          className="co-overlay fixed inset-0 z-[1100] flex items-center justify-center p-4
                     bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
          onClick={handleOverlayClick}
        >
          <div
            className="co-card relative w-full max-w-[500px] rounded-[20px]
                       bg-[var(--light-card)]
                       shadow-[0_24px_64px_rgba(84,81,255,0.18)]
                       dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)]
                       text-[var(--light-text)]
                       px-8 pt-8 pb-7"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Título */}
            <h2 className="font-poppins font-bold text-[28px] text-[var(--light-text)] m-0 mb-1">
              Reserva #{reserva.id}
            </h2>

            {/* Subtítulo */}
            <p className="font-poppins font-semibold text-[16px] text-[var(--light-text)] m-0 mb-5">
              Detalles de check-out
            </p>

            {/* Botón cerrar */}
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

            {/* Grid de información */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-[16px] mb-4
                            max-[460px]:grid-cols-1">
              <InfoRow icon={<UserRound size={16} />}  text={reserva.nombre} />
              
              <InfoRow icon={<IdCard size={16} />}      text={reserva.documento} />

              <InfoRow icon={<SvgIcon name="alojamiento" alt="Alojamiento" theme={theme} />} text={`Alojamiento: ${reserva.habitacion}`} />
              
              <InfoRow icon={<UsersRound size={16} />}  text={`${reserva.personas} personas`} />

              <InfoRow icon={<SvgIcon name="pago" alt="Pago" theme={theme} />} text={`Pago: ${reserva.pago}`} />
              
              <div /> {/* celda vacía para alinear columnas */}

              <InfoRow icon={<DollarSign size={16} />} text="Total a pagar: $200" />
              
              <InfoRow icon={<SvgIcon name="total" alt="Total" theme={theme} />} text="Total: $1000" />
            </div>

            {/* Más información */}
            <div className="mb-5">
              <button className="co-mas-info" onClick={onBack}>
                Mas informacion
              </button>
            </div>

            {/* Ingrese los datos de pago */}
            <div className="mb-3">
              <label className="block font-poppins text-[14px] text-[var(--light-text)] mb-2">
                Ingrese los datos de pago
              </label>

              {/* Select método de pago */}
              <div className="relative mb-3">
                <select
                  className="co-select"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                  <option value="Transferencia">Transferencia</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                                 text-[var(--light-text)] opacity-60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4,6 8,10 12,6" />
                  </svg>
                </span>
              </div>

              {/* Input texto adicional */}
              <input
                type="text"
                className="co-input"
                placeholder="Texto"
                value={textoPago}
                onChange={(e) => setTextoPago(e.target.value)}
              />
            </div>

            {/* Acciones footer */}
            <div className="flex items-center justify-end gap-3 mt-6 flex-wrap">
              <button className="co-btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="co-btn-primary"
                onClick={() => setMostrarInfoPago(true)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Información de Pago */}
      {mostrarInfoPago && (
        <ModalInfoPago
          reserva={reserva}
          onClose={onClose}
          metodoPago={metodoPago || "Tarjeta"}
          textoPago={textoPago}
        />
      )}
    </>
  );
};

export default ModalCheckOut;