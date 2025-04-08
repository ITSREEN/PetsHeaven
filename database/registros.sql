<<<<<<< HEAD
-- Active: 1743681932025@@127.0.0.1@3306@pets_heaven
=======
-- Active: 1741175022404@@127.0.0.1@3306@pets_heaven
>>>>>>> cc328b9d44350a2da28bd0aa26b17ae1b5c81475
INSERT INTO pets_heaven.roles (nom_rol) VALUES
('Administrador'),
('Veterinario');

INSERT INTO pets_heaven.permisos (nom_per) VALUES
('Gestionar usuarios'),
('Gestionar mascotas'),
('Gestionar citas'),
('Ver reportes'),
('Facturación');

INSERT INTO pets_heaven.usuarios (nom_usu, ape_usu, fec_nac_usu, tip_doc_usu, doc_usu, dir_usu, cel_usu, cel2_usu, email_usu, cont_usu,gen_usu) VALUES
('Juan', 'Pérez',NOW(), 'CC', '12345678', 'Calle 123 #45-67', '3001234567', NULL, 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Hombre'),
('María', 'Gómez',NOW(), 'CC', '87654321', 'Av. Principal #12-34', '3102345678', '3203456789', 'maria.gomez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Mujer'),
('Carlos', 'Rodríguez',NOW(), 'CE', 'AB123456', 'Carrera 56 #78-90', '3154567890', NULL, 'carlos.rod@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Hombre'),
('Ana', 'Martínez',NOW(), 'CC', '11223344', 'Diagonal 34 #56-78', '3175678901', NULL, 'ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Mujer'),
('Luis', 'García',NOW(), 'TI', '98765432', 'Transversal 12 #34-56', '3186789012', '3197890123', 'luis.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Hombre');

INSERT INTO pets_heaven.otorgar_roles (id_rol, id_usu) VALUES
(1,1),
(2,2),
(1,3),
(2,4),
(1,5);

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
(1, 'Consulta General', 50.00, 'Examen completo de salud para tu mascota con recomendaciones personalizadas.', 'Examen físico completo, revisión de historial médico, recomendaciones nutricionales.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/consulta.jpg', 1),
(1, 'Vacunación', 35.00, 'Programa completo de vacunación para prevenir enfermedades comunes.', 'Aplicación de vacunas según calendario, control de temperatura, seguimiento post-vacunación.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/vacunacion.jpg', 1),
(2, 'Cirugía', 200.00, 'Procedimientos quirúrgicos realizados por especialistas con equipos de última generación.', 'Evaluación pre-quirúrgica, anestesia monitorizada, equipo esterilizado, recuperación asistida.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/cirugia.jpg', 1),
(3, 'Emergencias 24h', 80.00, 'Atención inmediata para situaciones urgentes a cualquier hora del día.', 'Equipo de emergencias disponible 24/7, unidad de cuidados intensivos, monitoreo constante.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/urgencias.jpg', 1),
(4, 'Spa y Baño', 45.00, 'Servicio completo de baño, corte de pelo, limpieza de oídos y corte de uñas para tu mascota.', 'Baño con productos hipoalergénicos, secado profesional, corte según raza, cuidado de uñas y oídos.', 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Servicios/ba%C3%B1o.jpg', 1);

INSERT INTO pets_heaven.mascotas 
(nom_mas, esp_mas, col_mas, raz_mas, ali_mas, fec_nac_mas, pes_mas, gen_mas, id_pro_mas, est_rep_mas, fot_mas) VALUES
('Max', 'Perro', 'Marrón', 'Labrador Retriever', 'Purina Dog Chow', '2018-05-15', 28.5, 'M', 1, 'No esterilizado', 'https://www.javer-keleb.com/wp-content/uploads/2024/02/2.jpg'),
('Luna', 'Gato', 'Negro', 'Siamés', 'Whiskas', '2019-11-22', 4.2, 'F', 2, 'Esterilizado', 'https://elgatosiames.com/wp-content/uploads/2018/09/gato-negro.jpg'),
('Rocky', 'Perro', 'Blanco', 'Bulldog Francés', 'Royal Canin', '2020-03-10', 12.7, 'M', 3, 'No esterilizado', 'https://blog.dogfydiet.com/wp-content/uploads/2024/02/Preguntas-frecuentes-sobre-el-Bulldog-Frances-blanco-.jpg'),
('Bella', 'Gato', 'Gris', 'Persa', "Hill's Science Diet", '2017-07-30', 5.1, 'F', 4, 'Esterilizado', 'https://parcerosfelinos.com/wp-content/uploads/2020/06/parceros-6.jpg'),
('Charlie', 'Perro', 'Dorado', 'Golden Retriever', 'Pedigree', '2019-01-25', 32.0, 'M', 5, 'No esterilizado', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqPq2Bq0BvX-vNuOnoo4ruQA1sBuWdNru7Tw&s'),
('Milo', 'Gato', 'Atigrado', 'Mestizo', 'Friskies', '2021-02-14', 3.8, 'M', 1, 'No esterilizado', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Female_European_shorthair_in_cat_show_Helsinki_2005-07-31.JPG/320px-Female_European_shorthair_in_cat_show_Helsinki_2005-07-31.JPG'),
('Lucy', 'Perro', 'Blanco y Negro', 'Border Collie', 'Eukanuba', '2016-09-05', 20.3, 'F', 2, 'Esterilizado', 'https://ventadecachorros.com.co/wp-content/uploads/2020/10/cachorros-border-collie-hembras-y-machos-D_NQ_NP_886207-MCO33051173463_112019-F.jpg'),
('Oliver', 'Gato', 'Naranja', 'Maine Coon', 'Blue Buffalo', '2018-12-18', 7.5, 'M', 3, 'Esterilizado', 'https://www.purina.es/sites/default/files/styles/ttt_image_510/public/2024-02/sitesdefaultfilesstylessquare_medium_440x440public2022-06Maine20Coon.1.jpg?itok=25PAnnaV'),
('Daisy', 'Perro', 'Crema', 'Poodle', 'Nutro', '2020-06-08', 6.8, 'F', 4, 'No esterilizado', 'https://img.freepik.com/fotos-premium/lindo-cachorro-caniche-crema-poco-peludo_126745-916.jpg'),
('Leo', 'Perro', 'Negro y Fuego', 'Doberman', 'Canidae', '2017-04-20', 34.2, 'M', 5, 'Esterilizado', 'https://tucachorrotienda.com/wp-content/uploads/2019/12/doberman-cachorro5.jpg');

