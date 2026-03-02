import React from 'react'
import { CalendarArrowDown, CalendarArrowUp, CalendarRange, ClockArrowUp, ClockArrowDown, Users, BedDouble, Car, Hotel } from "lucide-react";

const DatosEstadia: React.FC = () => {
  return (
    <div className='mt-4'>
      <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
        Datos de la estadía
      </h2>

      {/* fila 1 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <CalendarArrowUp size={16} />
          <span className="">Fecha estimada de check-in:</span>
          <span>25/01/2026</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarArrowDown size={16} />
          <span className="">Fecha estimada de check-out:</span>{" "}
          <span>02/02/2026</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarRange size={16} />
          <span className="">Cantidad de noches:</span>{" "}
          <span>09</span>
        </div>
      </div>

      {/* fila 2 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <ClockArrowUp size={16} />
          <span className="">Hora estimada de llegada:</span>
          <span>14:30</span>
        </div>

        <div className="flex items-center gap-2">
          <ClockArrowDown size={16} />
          <span className="">Hora estimada de salida:</span>{" "}
          <span>10:00</span>
        </div>

      </div>

      {/* fila 3 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="">Cantidad de adultos:</span>
          <span>04</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={16} />
          <span className="">Cantidad de niños:</span>{" "}
          <span>00</span>
        </div>

        <div className="flex items-center gap-2">
          <BedDouble size={16} />
          <span className="">Cantidad de habitaciones:</span>{" "}
          <span>01</span>
        </div>
      </div>

      {/* fila 4 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <Hotel size={16} />
          <span className="">Tipo de alojamiento:</span>
          <span>Habitación estándard</span>
        </div>

        <div className="flex items-center gap-2">
          <Hotel size={16} />
          <span className="">Alojamiento:</span>{" "}
          <span>H06-E</span>
        </div>

        <div className="flex items-center gap-2">
          <Car size={16} />
          <span className="">Ingresa con vehículo:</span>{" "}
          <span>Sí</span>
        </div>
      </div>

    </div>
  )
}

export default DatosEstadia