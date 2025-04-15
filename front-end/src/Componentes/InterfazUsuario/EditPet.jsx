// Imports 
import '../../../public/styles/InterfazUsuario/editPets.css'
import { errorStatusHandler } from '../Varios/Util'
import { ModifyData } from '../Varios/Requests'

// Librarys 
import React, { useState } from 'react'

// Main component 
export const EditPetButton = ({ petData, onSave, open = false }) => {
    // Vars 
    const URL = 'http://localhost:3000/pet/modify'
    const [isOpen, setIsOpen] = useState(open)
    const [formData, setFormData] = useState(petData)

    // Handle values
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(false)
        setIsOpen(false)
    }

    const modifyData = async () => {
        console.log(formData)
        try {
            const mod = await ModifyData(URL,formData)
        } catch (err) {
            if(err.status) {
                const message = errorStatusHandler(err.status)
                swal({
                  title: 'Error',
                  text: `${message}`,
                  icon: 'warning',
                })
            } else console.log(err)
        }
    }

    return (
      <section>
        {isOpen && (
            <section className="modal-overlay" onClick={() => setIsOpen(false)}>
            <section className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setIsOpen(false)}>&times</button>
                
                <h2>Editar información</h2>
                
                <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Especie</label>
                        <select name="esp_mas" value={formData.esp_mas} 
                            onChange={handleChange}
                            className="form-input">
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Ave">Ave</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Raza</label>
                        <input
                            type="text"
                            name="raz_mas"
                            value={formData.raz_mas}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <input
                            type="text"
                            name="col_mas"
                            value={formData.col_mas}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Género</label>
                        <select
                            name="gen_mas"
                            value={formData.gen_mas}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="M">Macho</option>
                            <option value="H">Hembra</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha Nacimiento</label>
                        <input
                            type="text"
                            name="fec_nac_mas"
                            value={formData.fec_nac_mas}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Peso (kg)</label>
                        <input
                            type="number"
                            name="pes_mas"
                            value={formData.pes_mas}
                            onChange={handleChange}
                            className="form-input"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Estado Reproductivo</label>
                        <select
                            name="est_rep_mas"
                            value={formData.est_rep_mas}
                            onChange={handleChange}
                            className="form-input"
                        >
                            <option value="Esterilizado">Esterilizado</option>
                            <option value="No-esterilizado">No esterilizado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Alimento</label>
                        <input
                            type="text"
                            name="ali_mas"
                            value={formData.ali_mas}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </button>
                    <button type="submit" className="save-button" onClick={modifyData}>
                        Guardar Cambios
                    </button>
                </div>
                </form>
            </section>
            </section>
        )}
    </section>
  )
}