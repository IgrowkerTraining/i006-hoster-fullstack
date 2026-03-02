import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import ModalReserva, { Reserva } from "../common/modals/ModalReserva";

/* ─────────────────────────────────────────────
   Datos mock — reemplazá por tu llamada a API
───────────────────────────────────────────── */
const MOCK_RESERVA: Reserva = {
  id: "9524",
  nombre: "Laura Pérez",
  telefono: "+54 9 261123456",
  documento: "44765419",
  email: "juan.gomez@gmail.com",
  habitacion: "H06-E",
  personas: 4,
  fechaLlegada: "25/01/2026",
  fechaSalida: "02/02/2026",
  pago: "Parcial",
  serviciosAdicionales: 2,
  nota: "Habitación silenciosa",
};

/* ─────────────────────────────────────────────
   Props del componente
───────────────────────────────────────────── */
type Props = {
  placeholder?: string;
};

/* ─────────────────────────────────────────────
   BuscarReserva
───────────────────────────────────────────── */
const BuscarReserva: React.FC<Props> = ({ placeholder = "Buscar" }) => {
  const [query, setQuery]       = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = useCallback(() => {
    if (query.trim()) setModalOpen(true);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* ── Buscador ── */}
      <div className="bg-[var(--light-card)] border border-[var(--light-outline)] rounded-2xl p-5 w-full">
        <h2 className="font-poppins font-semibold text-[20px] text-[var(--light-text)] mb-3">
          Buscar reserva
        </h2>

        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="
              w-full h-[44px]
              rounded-lg
              bg-[var(--light-main2)]
              px-4 pr-12
              font-poppins text-[16px]
              text-[var(--light-text)]
              placeholder:text-[var(--light-placeholder)]
              outline-none
              border border-transparent
              focus:border-[var(--light-accent)]
              focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)]
              transition
            "
          />

          <button
            type="button"
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              text-[var(--light-text)]
              opacity-80 hover:opacity-100
              transition
            "
            title="Buscar"
            onClick={handleSearch}
          >
            <Search size={18} />
          </button>
        </div>

        <p className="mt-2 font-poppins text-[12px] font-normal text-[var(--light-text)] opacity-80">
          Por ID, nombre del huésped o documento de identidad
        </p>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <ModalReserva
          reserva={MOCK_RESERVA}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default BuscarReserva;