import React from "react"
import { Search, ChevronUp } from "lucide-react"
import NavBarAdmin from "../BarrasNavegacion/NavBarAdmi"
import '../../../public/styles/InterfazAdmin/HomeAdmin.css'

// Componente de icono de huella personalizado
const IconoHuella = ({ className, color = "#0080ff", size = 24 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 14.5C9.88071 14.5 11 13.3807 11 12C11 10.6193 9.88071 9.5 8.5 9.5C7.11929 9.5 6 10.6193 6 12C6 13.3807 7.11929 14.5 8.5 14.5Z"
      fill={color}
    />
    <path
      d="M15.5 14.5C16.8807 14.5 18 13.3807 18 12C18 10.6193 16.8807 9.5 15.5 9.5C14.1193 9.5 13 10.6193 13 12C13 13.3807 14.1193 14.5 15.5 14.5Z"
      fill={color}
    />
    <path
      d="M8.5 21.5C9.88071 21.5 11 20.3807 11 19C11 17.6193 9.88071 16.5 8.5 16.5C7.11929 16.5 6 17.6193 6 19C6 20.3807 7.11929 21.5 8.5 21.5Z"
      fill={color}
    />
    <path
      d="M15.5 21.5C16.8807 21.5 18 20.3807 18 19C18 17.6193 16.8807 16.5 15.5 16.5C14.1193 16.5 13 17.6193 13 19C13 20.3807 14.1193 21.5 15.5 21.5Z"
      fill={color}
    />
    <path
      d="M12 8.5C12 9.88071 10.8807 11 9.5 11C8.11929 11 7 9.88071 7 8.5C7 7.11929 8.11929 6 9.5 6C10.8807 6 12 7.11929 12 8.5Z"
      fill={color}
    />
    <path
      d="M17 8.5C17 9.88071 15.8807 11 14.5 11C13.1193 11 12 9.88071 12 8.5C12 7.11929 13.1193 6 14.5 6C15.8807 6 17 7.11929 17 8.5Z"
      fill={color}
    />
  </svg>
)

// Datos de ejemplo estáticos
const propietariosEjemplo = [
  {
    id: 1,
    nombre: "Ana García",
    identificador: "1234567890",
    telefono: "555-123-4567",
    fechaCreacion: "15/04/2023",
    mascotas: [
      {
        id: 101,
        nombre: "Luna",
        tipo: "Hembra",
      },
      {
        id: 102,
        nombre: "Max",
        tipo: "Macho",
      },
    ],
    ultimaCita: {
      fecha: "10/04/2023",
      hora: "09:30am",
      tipo: "Consulta",
    },
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    identificador: "0987654321",
    telefono: "555-987-6543",
    fechaCreacion: "20/03/2023",
    mascotas: [
      {
        id: 103,
        nombre: "Rocky",
        tipo: "Macho",
      },
    ],
    ultimaCita: {
      fecha: "05/04/2023",
      hora: "11:00am",
      tipo: "Vacunación",
    },
  },
  {
    id: 3,
    nombre: "María López",
    identificador: "5678901234",
    telefono: "555-567-8901",
    fechaCreacion: "10/02/2023",
    mascotas: [
      {
        id: 104,
        nombre: "Bella",
        tipo: "Hembra",
      },
      {
        id: 105,
        nombre: "Toby",
        tipo: "Macho",
      },
      {
        id: 106,
        nombre: "Nina",
        tipo: "Hembra",
      },
    ],
    ultimaCita: {
      fecha: "12/04/2023",
      hora: "16:15pm",
      tipo: "Control",
    },
  },
]

export function HomeAdmin() {
  // Componente estático sin funcionalidad
  return (
    <div className="paginaHomeadmin">
        <NavBarAdmin/>
      <div className="contenedorPrincipalHomeadmin">
        <div className="encabezadoHomeadmin">
          <div className="tituloSeccionHomeadmin">
            <IconoHuella className="iconoMascotaHomeadmin" color="#0080ff" size={28} />
            <h1>Lista de propietarios y mascotas</h1>
            <div className="huellaDecorativaHomeadmin">
              <IconoHuella color="#e0edff" size={16} />
            </div>
          </div>
          <button className="botonRegistrarHomeadmin">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Registrar propietario
          </button>
        </div>

        <div className="contenedorBusquedaHomeadmin">
          <div className="seccionBusquedaHomeadmin">
            <label className="etiquetaBusquedaHomeadmin">Propietario</label>
            <div className="campoBusquedaWrapperHomeadmin">
              <div className="iconoCampoHomeadmin">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por identificación, teléfono o nombre del propietario"
                className="inputBusquedaHomeadmin"
              />
            </div>
          </div>

          <div className="seccionBusquedaHomeadmin">
            <label className="etiquetaBusquedaHomeadmin">
              Mascota
              <IconoHuella className="iconoEtiquetaHomeadmin" color="#94A3B8" size={14} />
            </label>
            <div className="campoBusquedaWrapperHomeadmin">
              <div className="iconoCampoHomeadmin">
                <IconoHuella color="#94A3B8" size={16} />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre o identificador de la mascota"
                className="inputBusquedaHomeadmin"
              />
            </div>
          </div>

          <div className="contenedorBotonBuscarHomeadmin">
            <button className="botonBuscarHomeadmin">
              <Search size={16} />
              Buscar
            </button>
          </div>
        </div>

        <div className="contenedorTablaHomeadmin">
          <table className="tablaPropietariosHomeadmin">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificador</th>
                <th>Teléfono</th>
                <th>
                  <div className="encabezadoMascotasHomeadmin">
                    Mascotas
                    <IconoHuella className="iconoEncabezadoHomeadmin" color="#94A3B8" size={14} />
                  </div>
                </th>
                <th className="columnaOrdenableHomeadmin">
                  Última gestión
                  <ChevronUp size={14} className="iconoOrdenarHomeadmin" />
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {propietariosEjemplo.map((propietario) => (
                <tr key={propietario.id}>
                  <td>
                    <div className="nombrePropietarioHomeadmin">
                      <div className="avatarHomeadmin">{propietario.nombre.charAt(0)}</div>
                      <div className="infoPropietarioHomeadmin">
                        <span className="nombreCompletoHomeadmin">{propietario.nombre}</span>
                        <span className="fechaCreacionHomeadmin">Creado el {propietario.fechaCreacion}</span>
                      </div>
                    </div>
                  </td>
                  <td>{propietario.identificador}</td>
                  <td>{propietario.telefono}</td>
                  <td>
                    {propietario.mascotas && propietario.mascotas.length > 0 ? (
                      <div className="listaMascotasHomeadmin">
                        {propietario.mascotas.map((mascota) => (
                          <div key={mascota.id} className="itemMascotaHomeadmin">
                            <IconoHuella className="iconoPataHomeadmin" color="#94A3B8" size={16} />
                            <span>
                              {mascota.nombre} - {mascota.tipo}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {propietario.ultimaCita ? (
                      <div className="infoCitaHomeadmin">
                        <div className="fechaCitaHomeadmin">
                          <span className="puntoEstadoHomeadmin"></span>
                          {propietario.ultimaCita.fecha} - {propietario.ultimaCita.hora}
                        </div>
                        <div className="tipoCitaHomeadmin">
                          {propietario.nombre} - {propietario.ultimaCita.tipo}
                        </div>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <button variant="ghost" size="icon" className="botonAccionHomeadmin">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 19.5V4.5C4 4.22386 4.22386 4 4.5 4H19.5C19.7761 4 20 4.22386 20 4.5V19.5C20 19.7761 19.7761 20 19.5 20H4.5C4.22386 20 4 19.7761 4 19.5Z"
                          stroke="#0080ff"
                          strokeWidth="2"
                        />
                        <path
                          d="M8 8H16M8 12H16M8 16H12"
                          stroke="#0080ff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="paginacionHomeadmin">
          <div className="contadorResultadosHomeadmin">
            <span className="numeroResultadosHomeadmin">10</span>
            <ChevronUp size={14} className="iconoDropdownHomeadmin" />
            <span className="textoVisualizandoHomeadmin">
              Visualizando 1 - {propietariosEjemplo.length} de {propietariosEjemplo.length} resultados
            </span>
          </div>
          <div className="huellasDecorativasPaginacionHomeadmin">
            <IconoHuella color="#e0edff" size={16} />
            <IconoHuella color="#e0edff" size={12} />
          </div>
        </div>
      </div>
    </div>
  )
}

