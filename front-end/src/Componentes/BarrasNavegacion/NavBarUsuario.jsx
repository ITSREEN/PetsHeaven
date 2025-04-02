import './App.css';
import { useState } from 'react';
import { User, LogOut } from 'lucide-react';

export const NavbarUsuario = ({ userRole = "Administrador" }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="navbar-container-user" role="banner">
      <nav className="navbar-top">
        <div className="logo-container">
          <div className="logo-navuser">
            <img 
              src="https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/3.png" 
              alt="Logo de PetsHeaven" 
              className="logo-img" 
            />
          </div>
          <div className="user-role-badge">
            <span>{userRole}</span>
          </div>
        </div>

        <div className="user-container">
          <div
            className="user-profile"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-expanded={showUserMenu}
            aria-haspopup="true"
            aria-label="Menú de usuario"
          >
            <img 
              src="/user-avatar.png" 
              alt="Foto de perfil del usuario" 
              className="user-avatar" 
            />
            
            {showUserMenu && (
              <ul className="user-dropdown" role="menu">
                <li role="menuitem">
                  <a href="/perfil" className="user-dropdown-item">
                    <User size={16} className="dropdown-icon" />
                    <span>Mi Perfil</span>
                  </a>
                </li>
                <li role="menuitem">
                  <a href="/logout" className="user-dropdown-item">
                    <LogOut size={16} className="dropdown-icon" />
                    <span>Cerrar Sesión</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};