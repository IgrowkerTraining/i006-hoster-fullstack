import React from 'react'
import { Calendar, CalendarRange, Car, DollarSign, HandPlatter, ParkingCircle, Receipt } from 'lucide-react'

const ServiciosAdicionales: React.FC = () => {
  return (
    <div className='mt-4'>
      <h2 className="text-[20px] font-semibold text-[var(--light-text)] mb-3">
        Servicios adicionales
      </h2>

      {/* fila 1 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <HandPlatter size={16} />
          <span className="">Servicios adicionales seleccionados:</span>
          <span>02</span>
        </div>
      </div>


      {/* fila 2 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <HandPlatter size={16} />
          <span className="">Servicio </span>
          <span>1</span>
        </div>

        <div className="flex items-center gap-2">
          <HandPlatter size={16} />
          <span className="">Servicio </span>
          <span>2</span>
        </div>
      </div>

      {/* fila 3 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="">Fecha Pedido:</span>
          <span>25/01/26</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="">Fecha Pedido:</span>
          <span>27/01/26</span>
        </div>
      </div>

      {/* fila 4 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <CalendarRange size={16} />
          <span className="">Cantidad de noches:</span>
          <span>7</span>
        </div>

        <div className="flex items-center gap-2">
          <CalendarRange size={16} />
          <span className="">Cantidad de noches:</span>
          <span>6</span>
        </div>
      </div>

      {/* fila 5 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span className="">Precio por noche:</span>
          <span>$10</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span className="">Precio por noche:</span>
          <span>$5</span>
        </div>
      </div>

      {/* fila 6 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <Receipt size={16} />
          <span className="">Precio total:</span>
          <span>$70</span>
        </div>

        <div className="flex items-center gap-2">
          <Receipt size={16} />
          <span className="">Precio total:</span>
          <span>$30</span>
        </div>
      </div>

      {/* fila 7 */}
      <div className="grid grid-cols-3 gap-6 text-[16px] font-normal text-[var(--light-text)] max-md:grid-cols-1">
        <div className="flex items-center gap-2">
          <ParkingCircle size={16} />
          <span className="">Estacionamiento incluido:</span>
          <span>Sí</span>
        </div>

        <div className="flex items-center gap-2">
          <Car size={16} />
          <span className="">Patente:</span>
          <span>AA 342 ZQ</span>
        </div>
      </div>
    </div>
  )
}

export default ServiciosAdicionales