INSERT INTO pets_heaven.roles (nom_rol) VALUES
('Administrador'),
('Veterinario');

INSERT INTO pets_heaven.permisos (nom_per) VALUES
('Gestionar usuarios'),
('Gestionar mascotas'),
('Gestionar citas'),
('Ver reportes'),
('Facturación');

INSERT INTO pets_heaven.usuarios (nom_usu, ape_usu, fec_nac_usu, tip_doc_usu, doc_usu, dir_usu, cel_usu, cel2_usu, email_usu, cont_usu) VALUES
('Juan', 'Pérez',NOW(), 'CC', '12345678', 'Calle 123 #45-67', '3001234567', NULL, 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('María', 'Gómez',NOW(), 'CC', '87654321', 'Av. Principal #12-34', '3102345678', '3203456789', 'maria.gomez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Carlos', 'Rodríguez',NOW(), 'CE', 'AB123456', 'Carrera 56 #78-90', '3154567890', NULL, 'carlos.rod@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Ana', 'Martínez',NOW(), 'CC', '11223344', 'Diagonal 34 #56-78', '3175678901', NULL, 'ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Luis', 'García',NOW(), 'TI', '98765432', 'Transversal 12 #34-56', '3186789012', '3197890123', 'luis.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO pets_heaven.otorgar_roles (id_rol, id_usu) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO pets_heaven.otorgar_permisos (id_per, id_usu) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);

INSERT INTO pets_heaven.categorias_ser (nom_cat) VALUES
('Medicina Preventiva'),
('Cirugías'),
('Urgencias'),
('Estética y Bienestar');

INSERT INTO pets_heaven.servicios (cat_ser, nom_ser, pre_ser, des_ser, tec_des_ser, img_ser, estado) VALUES
(1, 'Consulta General', 50.00, 'Examen completo de salud para tu mascota con recomendaciones personalizadas.', 'Examen físico completo, revisión de historial médico, recomendaciones nutricionales.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/consulta.png', 1),
(1, 'Vacunación', 35.00, 'Programa completo de vacunación para prevenir enfermedades comunes.', 'Aplicación de vacunas según calendario, control de temperatura, seguimiento post-vacunación.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/vacunacion.png', 1),
(2, 'Cirugía', 200.00, 'Procedimientos quirúrgicos realizados por especialistas con equipos de última generación.', 'Evaluación pre-quirúrgica, anestesia monitorizada, equipo esterilizado, recuperación asistida.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/cirugia.png', 1),
(3, 'Emergencias 24h', 80.00, 'Atención inmediata para situaciones urgentes a cualquier hora del día.', 'Equipo de emergencias disponible 24/7, unidad de cuidados intensivos, monitoreo constante.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/urgencias.png', 1),
(4, 'Spa y Baño', 45.00, 'Servicio completo de baño, corte de pelo, limpieza de oídos y corte de uñas para tu mascota.', 'Baño con productos hipoalergénicos, secado profesional, corte según raza, cuidado de uñas y oídos.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/ba%C3%B1o.png', 1);