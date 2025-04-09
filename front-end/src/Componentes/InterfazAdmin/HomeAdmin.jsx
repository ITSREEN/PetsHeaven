import React from "react";
import NavBarAdmin from "../BarrasNavegacion/NavBarAdmi";
import { useState } from "react"
import { Search, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import "./pet-owner-list.css"

export default function PetOwnerList() {
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "Citlali",
      identifier: "45645456",
      phone: "+573022270541",
      pets: [
        {
          name: "Sammy",
          type: "Perrito",
          id: 1,
        },
      ],
      lastAppointment: {
        date: "03/24/2023",
        time: "09:00am",
        status: "Completada",
      },
    },
    {
      id: 2,
      name: "Visualizando",
      identifier: "1 de 1 resultado",
      phone: "",
      pets: [],
      lastAppointment: null,
    },
  ])

  return (
    <div className="pet-owner-container">
      <div className="header">
        <div className="title-container">
          <svg className="pet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 12H14M12 10V14M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"
              stroke="#0080ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1>Lista de propietarios y mascotas</h1>
        </div>
        <Button className="register-button">
          <Plus size={16} />
          Registrar propietario
        </Button>
      </div>

      <div className="search-container">
        <div className="search-group">
          <label>Propietario</label>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Buscar por identificación, teléfono o nombre del propietario"
              className="search-input"
            />
          </div>
        </div>
        <div className="search-group">
          <label>Mascota</label>
          <div className="input-wrapper">
            <Input type="text" placeholder="Buscar por nombre o identificador de la mascota" className="search-input" />
          </div>
        </div>
        <Button className="search-button">
          <Search size={16} />
          Buscar
        </Button>
      </div>

      <div className="table-container">
        <table className="owners-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Identificador</th>
              <th>Teléfono</th>
              <th>Mascotas</th>
              <th>
                <div className="last-appointment-header">
                  Última agenda
                  <ChevronDown size={16} />
                </div>
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.id}>
                <td>
                  <div className="owner-name">
                    <div className="avatar" style={{ backgroundColor: owner.id === 1 ? "#e91e63" : "#5c6bc0" }}>
                      {owner.name.charAt(0)}
                    </div>
                    <span>{owner.name}</span>
                  </div>
                </td>
                <td>{owner.identifier}</td>
                <td>{owner.phone}</td>
                <td>
                  {owner.pets.length > 0 ? (
                    <div className="pet-list">
                      {owner.pets.map((pet) => (
                        <div key={pet.id} className="pet-item">
                          <svg className="pet-paw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                              fill="#888"
                            />
                            <path
                              d="M18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 10.3431 13.3431 9 15 9C16.6569 9 18 10.3431 18 12Z"
                              fill="#888"
                            />
                            <path
                              d="M6 12C6 13.6569 7.34315 15 9 15C10.6569 15 12 13.6569 12 12C12 10.3431 10.6569 9 9 9C7.34315 9 6 10.3431 6 12Z"
                              fill="#888"
                            />
                            <path
                              d="M12 18C12 16.3431 10.6569 15 9 15C7.34315 15 6 16.3431 6 18C6 19.6569 7.34315 21 9 21C10.6569 21 12 19.6569 12 18Z"
                              fill="#888"
                            />
                            <path
                              d="M12 18C12 16.3431 13.3431 15 15 15C16.6569 15 18 16.3431 18 18C18 19.6569 16.6569 21 15 21C13.3431 21 12 19.6569 12 18Z"
                              fill="#888"
                            />
                          </svg>
                          <span>
                            {pet.name} - {pet.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </td>
                <td>
                  {owner.lastAppointment ? (
                    <div className="appointment-info">
                      <Badge variant="outline" className="date-badge">
                        {owner.lastAppointment.date} - {owner.lastAppointment.time}
                      </Badge>
                      <span className="status">{owner.lastAppointment.status}</span>
                    </div>
                  ) : null}
                </td>
                <td>
                  {owner.id === 1 && (
                    <Button variant="ghost" size="icon" className="action-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 6V18M18 12H6"
                          stroke="#0080ff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
