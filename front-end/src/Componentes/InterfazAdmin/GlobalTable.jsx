// Librarys 
import React, { Component } from "react"
import { Edit, MoreHorizontal } from "lucide-react"

// Imports
import { formatDate } from '../Varios/Util'

// Import Styles 
import '../../../public/styles/InterfazAdmin/GlobalTable.css'

export class GlobalTable extends Component {
    constructor (props) {
        super(props)
        // Declare params
    }

    renderCell = (item, header) => {
        // Lógica para tipos de datos comunes
        switch (header.dataType) {
          case "date":
            return formatDate(item[header]);
          case "array":
            return item[header]?.join(", ") || "- Empty -";
          case "status":
            return <span className={`badge ${item[header]}`}>{item[header]}</span>;
          default:
            return item[header] || "- Empty -";
        }
    }

    render () {
        const { headers,data } = this.props
        return (
            <section className={`global-table-container`}>
              <table className="global-table">
                <thead>
                  <tr key={112309}>
                    {headers.map((header, index) => (
                      <th key={index}>
                        <div className="header-content">
                          {header}
                        </div>
                      </th>
                    ))}
                    <th className="actions-header">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item,index) => (
                    <tr key={index}>
                      {headers.map((header) => (
                        <td>
                          {this.renderCell(item, header)}
                        </td>
                      ))}
                      <td className="actions-cell">
                        <button onClick={() => console.log("editar")}>
                          <Edit size={16} />
                        </button>
                        <button onClick={() => console.log("ver")}>
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
        )
    }
}

// GlobalTable.PropTypes = {
//     headers: propTypes.arrayOf().isRequired,
//     data: PropTypes.arrayOf(PropTypes.object).isRequired,
// }