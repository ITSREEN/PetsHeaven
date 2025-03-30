INSERT INTO pets_heaven.roles (id_rol, nom_rol) VALUES
('ROL001', 'Administrador'),
('ROL002', 'Veterinario');

INSERT INTO pets_heaven.permisos (id_per, nom_per) VALUES
('PER001', 'Gestionar usuarios'),
('PER002', 'Gestionar mascotas'),
('PER003', 'Gestionar citas'),
('PER004', 'Ver reportes'),
('PER005', 'Facturación');

INSERT INTO pets_heaven.usuarios (id_usu, nom_usu, ape_usu, tip_doc_usu, doc_usu, dir_usu, cel_usu, cel2_usu, email_usu, cont_usu) VALUES
('USU001', 'Juan', 'Pérez', 'CC', '12345678', 'Calle 123 #45-67', '3001234567', NULL, 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('USU002', 'María', 'Gómez', 'CC', '87654321', 'Av. Principal #12-34', '3102345678', '3203456789', 'maria.gomez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('USU003', 'Carlos', 'Rodríguez', 'CE', 'AB123456', 'Carrera 56 #78-90', '3154567890', NULL, 'carlos.rod@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('USU004', 'Ana', 'Martínez', 'CC', '11223344', 'Diagonal 34 #56-78', '3175678901', NULL, 'ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('USU005', 'Luis', 'García', 'TI', '98765432', 'Transversal 12 #34-56', '3186789012', '3197890123', 'luis.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO pets_heaven.otorgar_roles (id_rol, id_usu) VALUES
('ROL001', 'USU001'),
('ROL002', 'USU002'),
('ROL001', 'USU003'),
('ROL002', 'USU004'),
('ROL001', 'USU005');

INSERT INTO pets_heaven.otorgar_permisos (id_per, id_usu) VALUES
('PER001', 'USU001'),
('PER002', 'USU002'),
('PER003', 'USU003'),
('PER004', 'USU004'),
('PER005', 'USU005');

CALL `SearchPeoples`;