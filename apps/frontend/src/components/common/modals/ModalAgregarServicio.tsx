import React, { useState, useEffect } from "react";
import { X, DollarSign, UsersRound } from "lucide-react";
import { Reserva } from "./ModalReserva";
import ModalConfirmacion from "./ModalConfirmacion";

const SvgIcon: React.FC<{ name: string; alt: string; theme: "light" | "dark" }> = ({
  name, alt, theme,
}) => {
  const suffix = theme === "dark" ? "light" : "dark";
  return (
    <img src={`/icons/${name}-${suffix}.svg`} alt={alt} width={16} height={16}
      style={{ display: "block" }} />
  );
};


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

interface ServicioAgregado {
  id: number;
  nombre: string;
  fecha: string;
  monto: string;
}

interface ModalAgregarServicioProps {
  reserva: Reserva;
  onClose: () => void;
  onBack: () => void;
}

const SERVICIOS_INICIALES: ServicioAgregado[] = [
  { id: 1, nombre: "Servicio 1", fecha: "13/02/2026", monto: "70 USD" },
  { id: 2, nombre: "Servicio 1", fecha: "13/02/2026", monto: "70 USD" },
];

const OPCIONES_SERVICIO = [
  { value: "servicio1",  label: "Servicio 1" },
  { value: "servicio2",  label: "Servicio 2" },
  { value: "spa",        label: "Spa" },
  { value: "desayuno",   label: "Desayuno" },
  { value: "traslado",   label: "Traslado" },
];

const ModalAgregarServicio: React.FC<ModalAgregarServicioProps> = ({
  reserva,
  onClose,
  onBack,
}) => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [noches, setNoches] = useState<number | "">(1);
  const [servicios, setServicios] = useState<ServicioAgregado[]>(SERVICIOS_INICIALES);
  const [confirmando, setConfirmando] = useState(false);
  const theme = useTheme();

  const PRECIO_POR_NOCHE = 60;
  const totalCalculado = typeof noches === "number" ? noches * PRECIO_POR_NOCHE : 0;

  const handleAgregarServicio = () => {
    if (!servicioSeleccionado) return;
    const label = OPCIONES_SERVICIO.find((o) => o.value === servicioSeleccionado)?.label ?? servicioSeleccionado;
    const hoy = new Date().toLocaleDateString("es-AR", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });
    setServicios((prev) => [
      ...prev,
      { id: Date.now(), nombre: label, fecha: hoy, monto: `${totalCalculado} USD` },
    ]);
    setServicioSeleccionado("");
    setNoches(1);
  };

  const handleEliminar = (id: number) =>
    setServicios((prev) => prev.filter((s) => s.id !== id));

  const handleConfirmarFinal = () => {
    console.log("Servicios confirmados:", reserva.id, servicios);
    setConfirmando(false);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      <style>{`
        @keyframes as-fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes as-slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .as-overlay { animation: as-fadeIn  0.2s ease; }
        .as-card    { animation: as-slideUp 0.25s cubic-bezier(.22,.68,0,1.2); }

        .as-select {
          width: 100%;
          height: 44px;
          background: var(--light-main2);
          border: 1px solid transparent;
          border-radius: 10px;
          padding: 0 44px 0 14px;
          font-family: inherit;
          font-size: 14px;
          color: var(--light-text);
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .as-select:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }

        .as-input {
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
        .as-input::placeholder { color: var(--light-placeholder); }
        .as-input:focus {
          border-color: var(--light-accent);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--light-accent) 20%, transparent);
        }
        .as-input::-webkit-outer-spin-button,
        .as-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .as-input[type=number] { -moz-appearance: textfield; }

        /* Botón + agregar */
        .as-btn-plus {
          width: 36px; height: 36px;
          border-radius: 50%; border: none;
          background: var(--light-main2);
          color: var(--light-text);
          font-size: 22px; font-weight: 700; line-height: 1;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.1s;
        }
        .as-btn-plus:hover  { background: var(--light-main); transform: scale(1.05); }
        .as-btn-plus:active { transform: scale(0.97); }

        /* Botón − eliminar (fuera de la tarjeta, a la derecha) */
        .as-btn-minus {
          width: 28px; height: 28px;
          border-radius: 50%; border: none;
          background: transparent;
          color: var(--light-text);
          font-size: 20px; font-weight: 700; line-height: 1;
          cursor: pointer; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          opacity: 0.7;
          transition: opacity 0.2s, background 0.2s;
        }
        .as-btn-minus:hover { opacity: 1; background: var(--light-main); border-radius: 50%; }

        /* Tarjeta de servicio */
        .as-srv-card {
          background: var(--light-main2);
          border-radius: 10px;
          padding: 10px 14px;
          flex: 1;
        }

        /* Footer buttons */
        .as-btn-secondary {
          height: 44px; padding: 0 28px; border-radius: 22px; border: none;
          background: var(--light-main2); color: var(--light-text);
          font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .as-btn-secondary:hover  { background: var(--light-main); transform: translateY(-1px); }
        .as-btn-secondary:active { transform: translateY(0); }

        .as-btn-primary {
          height: 44px; padding: 0 28px; border-radius: 22px; border: none;
          background: var(--light-accent); color: #fff;
          font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .as-btn-primary:hover  { opacity: 0.88; transform: translateY(-1px); }
        .as-btn-primary:active { transform: translateY(0); }
      `}</style>

      {/* Overlay */}
      <div
        className="as-overlay fixed inset-0 z-[1100] flex items-center justify-center p-4
                   bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
        onClick={handleOverlayClick}
      >
        {/* Card */}
        <div
          className="as-card relative w-full max-w-[720px] rounded-[20px]
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
            Agregar un servicio
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

          <div className="grid grid-cols-2 gap-x-10 mb-5 max-[600px]:grid-cols-1">
            <div className="flex items-center gap-[10px] text-[14px] text-[var(--light-text)]">
              <span className="opacity-80">
                <SvgIcon name="alojamiento" alt="Alojamiento" theme={theme} />
              </span>
              <span>Alojamiento: {reserva.habitacion}</span>
            </div>
            <div className="flex items-center gap-[10px] text-[14px] text-[var(--light-text)]">
              <span className="opacity-80"><UsersRound size={16} /></span>
              <span>{reserva.personas} personas</span>
            </div>
          </div>

          {/* ── Layout 2 columnas ── */}
          <div className="grid grid-cols-2 gap-x-10 items-start max-[600px]:grid-cols-1">

            {/* ── Columna izquierda ── */}
            <div>
              {/* Select + botón + */}
              <label className="block font-poppins text-[14px] text-[var(--light-text)] mb-2">
                Seleccione un servicio
              </label>
              <div className="flex items-center gap-2 mb-5">
                <div className="relative flex-1">
                  <select
                    className="as-select"
                    value={servicioSeleccionado}
                    onChange={(e) => setServicioSeleccionado(e.target.value)}
                  >
                    <option value=""></option>
                    {OPCIONES_SERVICIO.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  {/* Flecha */}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                                   text-[var(--light-text)] opacity-60">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                         stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4,6 8,10 12,6" />
                    </svg>
                  </span>
                </div>
                <button className="as-btn-plus" onClick={handleAgregarServicio} title="Agregar">
                  +
                </button>
              </div>

              {/* Input noches */}
              <label className="block font-poppins text-[14px] text-[var(--light-text)] mb-2">
                Noches en la que se va utilizar el servicio
              </label>
              <input
                type="number"
                className="as-input mb-4"
                value={noches}
                min={1}
                placeholder="1"
                onChange={(e) => {
                  const v = e.target.value;
                  setNoches(v === "" ? "" : Math.max(1, parseInt(v) || 1));
                }}
              />

              {/* Total */}
              <div className="flex items-center gap-[8px] text-[14px] text-[var(--light-text)] mb-4">
                <span className="opacity-80"><DollarSign size={15} /></span>
                <span>Total: ${totalCalculado}</span>
              </div>

              {/* Nota */}
              <p className="font-poppins text-[12px] text-[var(--light-text)] opacity-70 m-0 leading-relaxed whitespace-nowrap">
                El total a pagar se le agregara al monto de pago pendiente
              </p>
            </div>

            {/* ── Columna derecha: lista de servicios ── */}
            <div className="flex flex-col gap-3
                            max-h-[260px] overflow-y-auto
                            scrollbar-thin pr-1">
              {servicios.length === 0 ? (
                <p className="text-[13px] text-[var(--light-text)] opacity-50">
                  Sin servicios agregados
                </p>
              ) : (
                servicios.map((srv) => (
                  <div key={srv.id}>
                    {/* Label encima de cada tarjeta */}
                    <p className="font-poppins text-[13px] font-semibold
                                  text-[var(--light-text)] mb-1 ml-1">
                      Servicios agregados
                    </p>

                    {/* Tarjeta + botón − al lado derecho */}
                    <div className="flex items-center gap-2">
                      <div className="as-srv-card">
                        <p className="font-poppins font-semibold text-[13px]
                                      text-[var(--light-text)] m-0">
                          {srv.nombre}
                        </p>
                        <div className="flex items-center justify-between mt-[6px]">
                          <span className="font-poppins text-[12px]
                                           text-[var(--light-text)] opacity-70">
                            {srv.fecha}
                          </span>
                          <span className="font-poppins text-[12px]
                                           text-[var(--light-text)] opacity-70">
                            {srv.monto}
                          </span>
                        </div>
                      </div>
                      {/* Botón − fuera de la tarjeta */}
                      <button
                        className="as-btn-minus"
                        onClick={() => handleEliminar(srv.id)}
                        title="Eliminar"
                      >
                        −
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="flex items-center justify-end gap-3 mt-7">
            <button className="as-btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="as-btn-primary" onClick={() => setConfirmando(true)}>
              Confirmar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {confirmando && (
        <ModalConfirmacion
          onConfirmar={handleConfirmarFinal}
          onCancelar={() => setConfirmando(false)}
          zIndex={1200}
        />
      )}
    </>
  );
};

export default ModalAgregarServicio;