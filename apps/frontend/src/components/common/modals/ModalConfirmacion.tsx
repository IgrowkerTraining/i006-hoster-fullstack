import React from "react";
import { X } from "lucide-react";

interface ModalConfirmacionProps {
  titulo?: string;
  descripcion?: string;
  labelConfirmar?: string;
  labelCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  zIndex?: number;
}

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  titulo = "¿Desea confirmar esta accion?",
  descripcion = "Recuerde que despues de esto la accion no se podra editar otra vez",
  labelConfirmar = "Confirmar",
  labelCancelar = "Cancelar",
  onConfirmar,
  onCancelar,
  zIndex = 1200,
}) => {
  return (
    <>
      <style>{`
        @keyframes mc-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes mc-slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .mc-overlay { animation: mc-fadeIn 0.18s ease; }
        .mc-card    { animation: mc-slideUp 0.22s cubic-bezier(.22,.68,0,1.2); }

        .mc-btn-secondary {
          height: 40px;
          padding: 0 22px;
          border-radius: 20px;
          border: none;
          background: var(--light-main2);
          color: var(--light-text);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .mc-btn-secondary:hover { background: var(--light-main); transform: translateY(-1px); }
        .mc-btn-secondary:active { transform: translateY(0); }

        .mc-btn-primary {
          height: 40px;
          padding: 0 22px;
          border-radius: 20px;
          border: none;
          background: var(--light-accent);
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }
        .mc-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .mc-btn-primary:active { transform: translateY(0); }
      `}</style>

      {/* Overlay */}
      <div
        className="mc-overlay fixed inset-0 flex items-center justify-center p-4
                   bg-[rgba(5,5,52,0.45)] dark:bg-[rgba(2,6,23,0.75)]"
        style={{ zIndex }}
        onClick={onCancelar}
      >
        {/* Card */}
        <div
          className="mc-card relative w-full max-w-[400px] rounded-[16px]
                     bg-[var(--light-card)]
                     shadow-[0_16px_48px_rgba(84,81,255,0.18)]
                     dark:shadow-[0_16px_48px_rgba(0,0,0,0.6)]
                     text-[var(--light-text)]
                     px-7 pt-7 pb-6"
          role="alertdialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onCancelar}
            aria-label="Cerrar"
            className="absolute top-4 right-4 flex items-center justify-center
                       w-7 h-7 rounded-lg border-none bg-transparent
                       text-[var(--light-text)] opacity-60 cursor-pointer
                       hover:opacity-100 hover:bg-[var(--light-main2)]
                       transition-all duration-200"
          >
            <X size={18} />
          </button>

          {/* Título */}
          <h3 className="font-poppins font-bold text-[18px] text-[var(--light-text)]
                         m-0 mb-3 pr-6 leading-snug">
            {titulo}
          </h3>

          {/* Descripción */}
          <p className="font-poppins text-[14px] text-[var(--light-text)]
                        opacity-80 m-0 mb-7 leading-relaxed">
            {descripcion}
          </p>

          {/* Acciones */}
          <div className="flex items-center justify-end gap-3">
            <button className="mc-btn-secondary" onClick={onCancelar}>
              {labelCancelar}
            </button>
            <button className="mc-btn-primary" onClick={onConfirmar}>
              {labelConfirmar}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalConfirmacion;