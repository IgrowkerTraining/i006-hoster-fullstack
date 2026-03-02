import React, { useState, useEffect } from "react";
import {
  X,
  UserRound,
  UsersRound,
  DollarSign,
  IdCard,
} from "lucide-react";
import { Reserva } from "./ModalReserva";
import ModalConfirmacion from "./ModalConfirmacion";

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


interface ModalCheckInProps {
  reserva: Reserva;
  onClose: () => void;
  /** Vuelve al modal principal */
  onBack: () => void;
}

const ModalCheckIn: React.FC<ModalCheckInProps> = ({ reserva, onClose, onBack }) => {
  const theme = useTheme();
  const [observacion, setObservacion] = useState("");
  const [servicio, setServicio] = useState("");
  const [confirmando, setConfirmando] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirmarCheckIn = () => {
    console.log("Check-in confirmado para reserva:", reserva.id);
    setConfirmando(false);
    onClose();
  };

  return (
    <>
      <style>{`
        @keyframes ci-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ci-slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .ci-overlay { animation: ci-fadeIn 0.2s ease; }
        .ci-card    { animation: ci-slideUp 0.25s cubic-bezier(.22,.68,0,1.2); }

        .ci-textarea {
          width: 100%;
          min-height: 80px;
          background: var(--light-main2);
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 12px 14px;
          font-family: inherit;
          font-size: 14px;
          color: var(--light-text);
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ci-textarea::placeholder { color: var(--light-placeholder); }
        .ci-textarea:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }

        .ci-select {
          width: 100%;
          height: 44px;
          background: var(--light-main2);
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 72px 0 14px;
          font-family: inherit;
          font-size: 14px;
          color: var(--light-text);
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ci-select:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }

        .ci-btn-secondary {
          height: 44px;
          padding: 0 24px;
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
        .ci-btn-secondary:hover { background: var(--light-main); transform: translateY(-1px); }
        .ci-btn-secondary:active { transform: translateY(0); }

        .ci-btn-primary {
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
        .ci-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .ci-btn-primary:active { transform: translateY(0); }

        .ci-btn-outline {
          height: 44px;
          padding: 0 24px;
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
        .ci-btn-outline:hover { background: var(--light-main); transform: translateY(-1px); }
        .ci-btn-outline:active { transform: translateY(0); }

        .ci-mas-info {
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
        .ci-mas-info:hover { opacity: 1; }
      `}</style>

      {/* Overlay */}
      <div
        className="ci-overlay fixed inset-0 z-[1100] flex items-center justify-center p-4
                   bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
        onClick={handleOverlayClick}
      >
        {/* Card */}
        <div
          className="ci-card relative w-full max-w-[560px] rounded-[20px]
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
            Detalles de check-in
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
                          max-[480px]:grid-cols-1">
            <InfoRow icon={<UserRound size={16} />}  text={reserva.nombre} />
            <InfoRow icon={<IdCard size={16} />}      text={reserva.documento} />

            <InfoRow icon={<SvgIcon name="alojamiento" alt="Alojamiento" theme={theme} />} text={`Alojamiento: ${reserva.habitacion}`} />
            <InfoRow icon={<UsersRound size={16} />}  text={`${reserva.personas} personas`} />

            <InfoRow
              icon={<SvgIcon name="fecha-salida" alt="Fecha salida" theme={theme} />}
              text={`Fecha salida: ${reserva.fechaSalida}`}
            />
            <InfoRow
              icon={<SvgIcon name="pago" alt="Pago" theme={theme} />}
              text={`Pago: ${reserva.pago}`}
            />

            <InfoRow icon={<DollarSign size={16} />} text="Total a pagar: $200" />
            <InfoRow icon={<SvgIcon name="total" alt="Total" theme={theme} />} text="Total: $1000" />
          </div>

          {/* Más información */}
          <div className="mb-5">
            <button className="ci-mas-info" onClick={onBack}>
              Mas información
            </button>
          </div>

          {/* Observación adicional */}
          <div className="mb-4">
            <label className="block font-poppins text-[14px] text-[var(--light-text)] mb-2">
              Agregar una observacion adicional
            </label>
            <textarea
              className="ci-textarea"
              placeholder="Texto"
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
            />
          </div>

          {/* Agregar servicio */}
          <div className="mb-7">
            <label className="block font-poppins text-[14px] text-[var(--light-text)] mb-2">
              Agregar un servicio
            </label>
            <div className="relative">
              <select
                className="ci-select"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              >
                <option value=""></option>
                <option value="desayuno">Desayuno</option>
                <option value="spa">Spa</option>
                <option value="traslado">Traslado</option>
              </select>
              {/* Flecha del select */}
              <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2
                               text-[var(--light-text)] opacity-60">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4,6 8,10 12,6" />
                </svg>
              </span>
              {/* Botón + */}
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2
                           w-7 h-7 flex items-center justify-center
                           rounded-full bg-[var(--light-main)] border-none cursor-pointer
                           text-[var(--light-text)] font-bold text-[18px]
                           hover:bg-[var(--light-accent)] hover:text-white
                           transition-all duration-200"
                onClick={() => console.log("agregar servicio:", servicio)}
                title="Agregar servicio"
              >
                +
              </button>
            </div>
          </div>

          {/* Acciones footer */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button className="ci-btn-outline" onClick={onBack}>
              Editar Reserva
            </button>
            <div className="flex gap-3">
              <button className="ci-btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button
                className="ci-btn-primary"
                onClick={() => setConfirmando(true)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación final */}
      {confirmando && (
        <ModalConfirmacion
          onConfirmar={handleConfirmarCheckIn}
          onCancelar={() => setConfirmando(false)}
          zIndex={1200}
        />
      )}
    </>
  );
};

export default ModalCheckIn;