import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  recepcionista: string;
  canalReserva: string;
  idReserva: string;
  nombreCompleto: string;
  pais: string;
  tipoDocumento: string;
  documentoIdentidad: string;
  email: string;
  telefono: string;
  fechaCheckin: string;
  fechaCheckout: string;
  cantidadNoches: string;
  ingresaVehiculo: "Si" | "No";
  horaLlegada: string;
  horaCheckout: string;
  tipoAlojamiento: string;
  numeroAlojamiento: string;
  adultos: number;
  ninos: number;
  habitaciones: number;
  serviciosAgregados: { nombre: string; precio: string }[];
  estacionamiento: "Si" | "No";
  patente: string;
  precioPorNoche: string;
}

interface EconData {
  medioPago: string;
  estadoPago: "Parcial" | "Total";
  montoAbona: string;
  saldoPendiente: string;
  nroRecibo: string;
  nota: string;
}

const initialForm: FormData = {
  recepcionista: "",
  canalReserva: "",
  idReserva: "HSTR-2026-000341",
  nombreCompleto: "",
  pais: "",
  tipoDocumento: "",
  documentoIdentidad: "",
  email: "",
  telefono: "",
  fechaCheckin: "",
  fechaCheckout: "",
  cantidadNoches: "",
  ingresaVehiculo: "No",
  horaLlegada: "",
  horaCheckout: "",
  tipoAlojamiento: "",
  numeroAlojamiento: "",
  adultos: 1,
  ninos: 0,
  habitaciones: 1,
  serviciosAgregados: [
    { nombre: "Servicio 1", precio: "20" },
    { nombre: "Servicio 2", precio: "30" },
  ],
  estacionamiento: "No",
  patente: "",
  precioPorNoche: "",
};

const initialEcon: EconData = {
  medioPago: "",
  estadoPago: "Total",
  montoAbona: "",
  saldoPendiente: "",
  nroRecibo: "",
  nota: "",
};

// ─── Helpers ──────────
function calcNights(checkin: string, checkout: string): string {
  if (!checkin || !checkout) return "";
  const a = new Date(checkin);
  const b = new Date(checkout);
  const diff = Math.round((b.getTime() - a.getTime()) / 86400000);
  return diff > 0 ? String(diff) : "";
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

// ─── Componentes base ────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[14px] font-medium text-(--light-text)]1 ml-1 font-poppins">
    {children}
  </label>
);

const inputBase =
  "w-full bg-[var(--light-main2)] border border-transparent rounded-lg px-3 py-2 text-[14px] text-[var(--light-text)] focus:border-[var(--light-accent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)] outline-none transition-all placeholder:text-[var(--light-placeholder)]";

const InputField = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${inputBase} ${props.className || ""}`} />
);

const SelectField = ({
  options,
  ...props
}: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative w-full">
    <select
      {...props}
      className={`${inputBase} appearance-none cursor-pointer pr-9 w-full`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt === "Seleccionar" ? "" : opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-(--light-text) opacity-60 pointer-events-none"
    />
  </div>
);

const DateInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="relative w-full">
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputBase} cursor-pointer pr-10`}
      style={{ colorScheme: "light dark" }}
    />
  </div>
);

const TimeInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) => (
  <div className="relative w-full">
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputBase} cursor-pointer pr-10`}
      style={{ colorScheme: "light dark" }}
    />
  </div>
);

const CounterField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) => (
  <div className="flex items-center justify-between w-full">
    <span className="text-[13px] text-(--light-text) font-light w-24">{label}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="text-(--light-text) text-[16px] leading-none hover:opacity-70 select-none"
      >
        +
      </button>
      <span className="text-[14px] font-medium w-5 text-center text-(--light-text)">
        {value.toString().padStart(2, "0")}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="text-(--light-text) text-[16px] leading-none hover:opacity-70 select-none"
      >
        −
      </button>
    </div>
  </div>
);

// ─── TAB 1: Datos de la reserva ─────────────
const DatosReservaTab: React.FC<{
  form: FormData;
  set: (k: keyof FormData, v: any) => void;
}> = ({ form, set }) => {
  useEffect(() => {
    set("cantidadNoches", calcNights(form.fechaCheckin, form.fechaCheckout));
  }, [form.fechaCheckin, form.fechaCheckout]);

  return (
    <form className="space-y-8 text-(--light-text)">

      {/* SECCIÓN 1: DATOS GENERALES */}
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <div>
          <Label>Recepcionista</Label>
          <SelectField
            options={["Seleccionar", "Admin", "Laura Pérez"]}
            value={form.recepcionista}
            onChange={(e) => set("recepcionista", e.target.value)}
          />
        </div>
        <div>
          <Label>Canal de reserva</Label>
          <SelectField
            options={["Seleccionar", "Booking", "Directo", "Venta telefónica"]}
            value={form.canalReserva}
            onChange={(e) => set("canalReserva", e.target.value)}
          />
        </div>
        <div>
          <Label>ID de la reserva</Label>
          <InputField value={form.idReserva} disabled />
        </div>
      </div>

      {/* SECCIÓN 2: DATOS DEL HUÉSPED */}
      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos del huésped</h2>
        <div className="grid grid-cols-4 gap-x-8 gap-y-6">
          <div>
            <Label>Nombre completo</Label>
            <InputField
              placeholder="Juan Pérez"
              value={form.nombreCompleto}
              onChange={(e) => set("nombreCompleto", e.target.value)}
            />
          </div>
          <div>
            <Label>País</Label>
            <SelectField
              options={["Seleccionar", "Argentina", "Chile", "Uruguay", "Venezuela"]}
              value={form.pais}
              onChange={(e) => set("pais", e.target.value)}
            />
          </div>
          <div>
            <Label>Tipo de Documento</Label>
            <SelectField
              options={["Seleccionar", "DNI", "Pasaporte"]}
              value={form.tipoDocumento}
              onChange={(e) => set("tipoDocumento", e.target.value)}
            />
          </div>
          <div>
            <Label>Documento de identidad</Label>
            <InputField
              placeholder="12345678"
              value={form.documentoIdentidad}
              onChange={(e) => set("documentoIdentidad", e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-8 mt-6">
          <div>
            <Label>Email</Label>
            <InputField
              placeholder="juan.perez@gmail.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Teléfono de contacto</Label>
            <InputField
              placeholder="12345678"
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: DATOS DE LA ESTADÍA */}
      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos de la estadía</h2>
        <div className="grid grid-cols-4 gap-x-8 gap-y-6">

          <div>
            <Label>Fecha estimada de check-in</Label>
            <DateInput
              value={form.fechaCheckin}
              onChange={(v) => set("fechaCheckin", v)}
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div>
            <Label>Fecha estimada de check-out</Label>
            <DateInput
              value={form.fechaCheckout}
              onChange={(v) => set("fechaCheckout", v)}
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div>
            <Label>Cantidad de noches</Label>
            <InputField
              value={form.cantidadNoches}
              placeholder="00"
              readOnly
            />
            <div className="mt-4">
              <Label>Ingresa con vehículo</Label>
              <div className="flex flex-col gap-1 mt-1">
                <label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
                  <input
                    type="radio"
                    name="v"
                    checked={form.ingresaVehiculo === "Si"}
                    onChange={() => set("ingresaVehiculo", "Si")}
                  />{" "}
                  Si
                </label>
                <label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
                  <input
                    type="radio"
                    name="v"
                    checked={form.ingresaVehiculo === "No"}
                    onChange={() => set("ingresaVehiculo", "No")}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Cantidad de personas  */}
          <div className="row-span-2">
            <Label>Cantidad de personas</Label>
            <div className="space-y-2 mt-1">
              <CounterField label="Adultos" value={form.adultos} onChange={(v) => set("adultos", v)} />
              <CounterField label="Niños" value={form.ninos} onChange={(v) => set("ninos", v)} />
              <CounterField label="Habitaciones" value={form.habitaciones} onChange={(v) => set("habitaciones", v)} />
            </div>
          </div>

          <div>
            <Label>Hora estimada de llegada</Label>
            <TimeInput
              value={form.horaLlegada}
              onChange={(v) => set("horaLlegada", v)}
              placeholder="14:00"
            />
          </div>
          <div>
            <Label>Hora estimada de check-out</Label>
            <TimeInput
              value={form.horaCheckout}
              onChange={(v) => set("horaCheckout", v)}
              placeholder="10:00"
            />
          </div>
          <div />

          <div>
            <Label>Tipo de alojamiento</Label>
            <SelectField
              options={["Seleccionar", "Habitación", "Habitación Deluxe", "Suite"]}
              value={form.tipoAlojamiento}
              onChange={(e) => set("tipoAlojamiento", e.target.value)}
            />
          </div>
          <div>
            <Label>Número de alojamiento</Label>
            <InputField
              placeholder="03"
              value={form.numeroAlojamiento}
              onChange={(e) => set("numeroAlojamiento", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECCIÓN 4: SERVICIOS ADICIONALES */}
      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Servicios adicionales</h2>
        <div className="grid grid-cols-3 gap-x-8 items-start">

          {/* Col 1: Buscar + Precio por noche */}
          <div className="flex flex-col gap-4">
            <div>
              <Label>Buscar servicios</Label>
              <InputField placeholder="Buscar" />
            </div>
          </div>

          {/* Col 2: Servicios agregados */}
          <div>
            <p className="text-[14px] font-medium mb-2 ml-1">Servicios agregados</p>
            <div className="space-y-2">
              {form.serviciosAgregados.map((s, i) => (
                <div
                  key={i}
                  className="bg-[varlight-main2) rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-[13px] font-medium">{s.nombre}</p>
                    <p className="text-[11px] text-(--light-placeholder)">{s.precio} USD</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      set("serviciosAgregados", form.serviciosAgregados.filter((_, j) => j !== i))
                    }
                    className="text-(--light-text) hover:opacity-70 shrink-0 text-[18px] leading-none"
                  >
                    −
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Estacionamiento + Patente condicional */}
          <div className="flex flex-col gap-3">
            <div>
              <Label>Estacionamiento incluido</Label>
              <div className="flex flex-col gap-1 mt-2">
                <label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
                  <input
                    type="radio"
                    name="p"
                    checked={form.estacionamiento === "No"}
                    onChange={() => set("estacionamiento", "No")}
                  />{" "}
                  No
                </label>
                <label className="flex items-center gap-1.5 text-[14px] cursor-pointer">
                  <input
                    type="radio"
                    name="p"
                    checked={form.estacionamiento === "Si"}
                    onChange={() => set("estacionamiento", "Si")}
                  />{" "}
                  Si
                </label>
              </div>
            </div>
            {form.estacionamiento === "Si" && (
              <div>
                <Label>Patente</Label>
                <InputField
                  placeholder="AA 342 ZQ"
                  value={form.patente}
                  onChange={(e) => set("patente", e.target.value)}
                />
              </div>
            )}
          </div>

        </div>
      </div>

    </form>
  );
};

// ─── TAB 2: Datos Económicos ─────────────────────────────────────────────────
const DatosEconomicosTab: React.FC<{
  form: FormData;
  set: (k: keyof FormData, v: any) => void;
  econ: EconData;
  setEcon: (k: keyof EconData, v: any) => void;
}> = ({ form, set, econ, setEcon }) => {

  // ── Cálculos automáticos ─────────────────────────────────────────────────
  const precioPorNoche = parseFloat(form.precioPorNoche) || 0;
  const noches = parseInt(form.cantidadNoches) || 0;
  const totalNoches = precioPorNoche * noches;

  const totalServicios = form.serviciosAgregados.reduce(
    (acc, s) => acc + (parseFloat(s.precio) || 0),
    0
  );

  const totalEstadia = totalNoches + totalServicios;
  const montoAbona = parseFloat(econ.montoAbona) || 0;
  const saldoPendiente = econ.estadoPago === "Total" ? 0 : Math.max(0, totalEstadia - montoAbona);

  useEffect(() => {
    setEcon(
      "saldoPendiente",
      econ.estadoPago === "Total" ? "0" : String(Math.max(0, totalEstadia - montoAbona))
    );
  }, [econ.estadoPago, econ.montoAbona, totalEstadia]);

  return (
    <div className="space-y-10 text-(--light-text)">

      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Datos económicos</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <Label>Precio por noche</Label>
            <InputField
              placeholder="00 USD"
              value={form.precioPorNoche}
              onChange={(e) => set("precioPorNoche", e.target.value)}
            />
          </div>
          <div>
            <Label>Precio total de noches</Label>
            <InputField
              placeholder="00 USD"
              value={totalNoches > 0 ? `${totalNoches} USD` : ""}
              readOnly
            />
          </div>
          <div>
            <Label>Total estimado de la estadía</Label>
            <InputField
              placeholder="00 USD"
              value={totalEstadia > 0 ? `${totalEstadia} USD` : ""}
              readOnly
            />
          </div>
          <div>
            <Label>Precio total de servicios</Label>
            <InputField
              placeholder="00 USD"
              value={totalServicios > 0 ? `${totalServicios} USD` : ""}
              readOnly
            />
          </div>
          <div className="col-span-2">
            <Label>Servicios agregados</Label>
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {form.serviciosAgregados.map((s, i) => (
                <div
                  key={i}
                  className="bg-(--light-main2) rounded-lg px-4 py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="text-[13px] font-medium">{s.nombre}</p>
                    <p className="text-[11px] text-(--light-placeholder)">{s.precio} USD</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      set("serviciosAgregados", form.serviciosAgregados.filter((_, j) => j !== i))
                    }
                    className="text-(--light-text) hover:opacity-70 text-[18px] leading-none"
                  >
                    −
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Forma de pago</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <Label>Medio de pago</Label>
            <SelectField
              options={["Seleccionar", "Efectivo", "Tarjeta de crédito", "Transferencia"]}
              value={econ.medioPago}
              onChange={(e) => setEcon("medioPago", e.target.value)}
            />
          </div>
          <div>
            <Label>Estado de pago</Label>
            <div className="flex flex-col gap-1 mt-2">
              <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                <input
                  type="radio"
                  name="estadoPago"
                  checked={econ.estadoPago === "Parcial"}
                  onChange={() => setEcon("estadoPago", "Parcial")}
                />{" "}
                Parcial
              </label>
              <label className="flex items-center gap-2 text-[14px] cursor-pointer">
                <input
                  type="radio"
                  name="estadoPago"
                  checked={econ.estadoPago === "Total"}
                  onChange={() => setEcon("estadoPago", "Total")}
                />{" "}
                Total
              </label>
            </div>
          </div>
          <div />
          <div>
            <Label>Monto que abona ahora</Label>
            <InputField
              placeholder="00 USD"
              value={econ.estadoPago === "Total" ? `${totalEstadia} USD` : econ.montoAbona}
              onChange={(e) => setEcon("montoAbona", e.target.value)}
              readOnly={econ.estadoPago === "Total"}
            />
          </div>
          <div>
            <Label>Saldo pendiente</Label>
            <InputField
              placeholder="00 USD"
              value={
                econ.estadoPago === "Total"
                  ? "0 USD"
                  : saldoPendiente > 0
                  ? `${saldoPendiente} USD`
                  : "0 USD"
              }
              readOnly
            />
          </div>
          <div>
            <Label>Número de recibo/transacción</Label>
            <InputField
              placeholder="1487"
              value={econ.nroRecibo}
              onChange={(e) => setEcon("nroRecibo", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[15px] font-bold mb-4 uppercase tracking-wide">Observaciones</h2>
        <div>
          <Label>Nota del recepcionista</Label>
          <textarea
            placeholder="Escribe aquí"
            rows={4}
            value={econ.nota}
            onChange={(e) => setEcon("nota", e.target.value)}
            className="w-full max-w-[340px] bg-(--light-main2) border border-transparent rounded-lg px-3 py-2 text-[14px] text-(--light-text) focus:border-(--light-accent) focus:ring-2 focus:ring-[color-mix(in_srgb,var(--light-accent)_25%,transparent)] outline-none resize-none placeholder:text-(--light-placeholder) transition"
          />
        </div>
      </div>

    </div>
  );
};

// ─── TAB 3: Confirmación ─────────────────────────────────────────────────────
const Row = ({ label, value }: { label: string; value: string }) => (
  <p className="text-[13px] text-(--light-text)">
    <span className="font-semibold">{label}:</span>{"  "}{value || "—"}
  </p>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[15px] font-bold uppercase tracking-wide mt-6 mb-3 text-(--light-text)">
    {children}
  </h2>
);

const ConfirmacionTab: React.FC<{ form: FormData; econ: EconData }> = ({ form, econ }) => {
  const precioPorNoche = parseFloat(form.precioPorNoche) || 0;
  const noches = parseInt(form.cantidadNoches) || 0;
  const totalNoches = precioPorNoche * noches;
  const totalServicios = form.serviciosAgregados.reduce((a, s) => a + (parseFloat(s.precio) || 0), 0);
  const totalEstadia = totalNoches + totalServicios;
  const montoAbona = parseFloat(econ.montoAbona) || 0;
  const saldoPendiente = econ.estadoPago === "Total" ? 0 : Math.max(0, totalEstadia - montoAbona);

  return (
    <div className="text-(--light-text) space-y-1 max-w-2xl">
      <h2 className="text-[18px] font-bold mb-4">Confirmación</h2>

      <Row label="Recepcionista" value={form.recepcionista} />
      <Row label="Canal de reserva" value={form.canalReserva} />
      <Row label="ID de la reserva" value={form.idReserva} />

      <SectionTitle>Datos del huésped</SectionTitle>
      <Row label="Nombre completo" value={form.nombreCompleto} />
      <Row label="País" value={form.pais} />
      <Row label="Tipo de documento" value={form.tipoDocumento} />
      <Row label="Número de identidad" value={form.documentoIdentidad} />
      <Row label="Email" value={form.email} />
      <Row label="Teléfono de contacto" value={form.telefono} />

      <SectionTitle>Datos de la estadía</SectionTitle>
      <Row label="Fecha estimada de check-in" value={formatDate(form.fechaCheckin)} />
      <Row label="Fecha estimada de check-out" value={formatDate(form.fechaCheckout)} />
      <Row label="Cantidad de noches" value={form.cantidadNoches} />
      <Row label="Cantidad de adultos" value={form.adultos.toString().padStart(2, "0")} />
      <Row label="Cantidad de niños" value={form.ninos.toString().padStart(2, "0")} />
      <Row label="Cantidad de habitaciones" value={form.habitaciones.toString().padStart(2, "0")} />
      <Row label="Hora estimada de llegada" value={form.horaLlegada} />
      <Row label="Hora estimada de salida" value={form.horaCheckout} />
      <Row label="Ingresa con vehículo" value={form.ingresaVehiculo} />
      <Row label="Tipo de alojamiento" value={form.tipoAlojamiento} />
      <Row label="Número de alojamiento" value={form.numeroAlojamiento} />

      <SectionTitle>Servicios adicionales</SectionTitle>
      <Row label="Servicios adicionales seleccionados" value={form.serviciosAgregados.length.toString().padStart(2, "0")} />
      {form.serviciosAgregados.map((s, i) => (
        <Row key={i} label={s.nombre} value={`${s.precio} USD`} />
      ))}
      <Row label="Estacionamiento incluido" value={form.estacionamiento} />
      {form.estacionamiento === "Si" && <Row label="Patente" value={form.patente} />}

      <SectionTitle>Datos económicos</SectionTitle>
      <Row label="Precio por noche" value={precioPorNoche > 0 ? `${precioPorNoche} USD` : "—"} />
      <Row label="Precio total de noches" value={totalNoches > 0 ? `${totalNoches} USD` : "—"} />
      <Row label="Precio total de servicios" value={totalServicios > 0 ? `${totalServicios} USD` : "—"} />
      <Row label="Total estimado de la estadía" value={totalEstadia > 0 ? `${totalEstadia} USD` : "—"} />

      <SectionTitle>Forma de pago</SectionTitle>
      <Row label="Medio de pago" value={econ.medioPago} />
      <Row label="Estado del pago" value={econ.estadoPago} />
      <Row
        label="Monto que abona ahora"
        value={econ.estadoPago === "Total" ? `${totalEstadia} USD` : econ.montoAbona ? `${econ.montoAbona} USD` : "—"}
      />
      <Row label="Saldo pendiente" value={`${saldoPendiente} USD`} />
      <Row label="Número de recibo/transacción" value={econ.nroRecibo} />

      <SectionTitle>Observaciones</SectionTitle>
      <Row label="Nota del recepcionista" value={econ.nota} />
    </div>
  );
};

type Tab = "Datos de la reserva" | "Datos económicos" | "Confirmación";

const NuevaReserva: React.FC = () => {
  const tabs: Tab[] = ["Datos de la reserva", "Datos económicos", "Confirmación"];
  const [activeTab, setActiveTab] = useState<Tab>("Datos de la reserva");
  const [form, setFormState] = useState<FormData>(initialForm);
  const [econ, setEconState] = useState<EconData>(initialEcon);
  const navigate = useNavigate();

  const set = (k: keyof FormData, v: any) =>
    setFormState((prev) => ({ ...prev, [k]: v }));

  const setEcon = (k: keyof EconData, v: any) =>
    setEconState((prev) => ({ ...prev, [k]: v }));

  const currentIndex = tabs.indexOf(activeTab);
  const goNext = () => { if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]); };
  const goPrev = () => { if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]); };

  return (
    <div className="min-h-screen bg-(--light-bg) p-8 font-poppins">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft
            className="text-(--light-text) cursor-pointer hover:opacity-70 transition"
            size={24}
            onClick={() => navigate("/dashboard")}
          />
          <h1 className="text-[24px] font-semibold text-(--light-text)">Nueva reserva</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-(--light-main2) rounded-lg p-1 mb-10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-[14px] font-medium rounded-md transition-all font-poppins ${
                activeTab === tab
                  ? "bg-(--light-accent)] text-(--icono-navbar-selected) shadow-sm"
                  : "text-(--light-text) hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "Datos de la reserva" && <DatosReservaTab form={form} set={set} />}
        {activeTab === "Datos económicos" && <DatosEconomicosTab form={form} set={set} econ={econ} setEcon={setEcon} />}
        {activeTab === "Confirmación" && <ConfirmacionTab form={form} econ={econ} />}

        {/* Navegación */}
        <div className="flex justify-between items-center pt-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 px-6 py-2 border border-(--light-outline) rounded-full text-(--light-text) hover:bg-(--light-main) transition-all font-medium text-[14px] font-poppins ${
              currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          {currentIndex < tabs.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 px-8 py-2 bg-(--light-accent) text-(--icono-navbar-selected) rounded-full hover:opacity-90 transition-all font-medium text-[14px] font-poppins cursor-pointer"
            >
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="flex items-center gap-2 px-8 py-2 bg-(--light-accent) text-(--icono-navbar-selected) rounded-full hover:opacity-90 transition-all font-medium text-[14px] font-poppins cursor-pointer"
            >
              ✓ Confirmar
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default NuevaReserva;