-- Active: 1740764800080@@127.0.0.1@3306@pets_heaven
DROP DATABASE IF EXISTS pets_heaven;
CREATE DATABASE IF NOT EXISTS pets_heaven;

CREATE TABLE pets_heaven.roles(
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nom_rol VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.permisos(
    id_per INT AUTO_INCREMENT PRIMARY KEY,
    nom_per VARCHAR(100) NOT NULL
);
/* DIVIDIR USUARIOS EN DOS TABLAS USUARIOS Y PERSONAS LOS USUARIOS TENDRAN LA INFORMACION RELEVANTE CON LA AUTENTICACION Y LAS PERSONAS EL RESTO DE INFORMACION */
CREATE TABLE pets_heaven.usuarios(
    id_usu INT AUTO_INCREMENT PRIMARY KEY,
    nom_usu VARCHAR(100) NOT NULL,
    ape_usu VARCHAR(100) NOT NULL,
    fec_nac_usu DATE NOT NULL,
    tip_doc_usu VARCHAR(10) NOT NULL,
    doc_usu VARCHAR(20) UNIQUE NOT NULL,INDEX(doc_usu),
    dir_usu VARCHAR(100) NOT NULL,
    cel_usu VARCHAR(20) NOT NULL,
    cel2_usu VARCHAR(20),
    email_usu VARCHAR(100) UNIQUE NOT NULL,INDEX(email_usu),
    cont_usu VARCHAR(255) NOT NULL,
    gen_usu VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT(1)
);

CREATE TABLE pets_heaven.otorgar_roles(
    id_rol INT NOT NULL,INDEX(id_rol),FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
    id_usu INT NOT NULL,INDEX(id_usu),FOREIGN KEY(id_usu) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_rol,id_usu)
);

CREATE TABLE pets_heaven.otorgar_permisos(
    id_per INT NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES permisos(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    id_usu INT NOT NULL,INDEX(id_usu),FOREIGN KEY(id_usu) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_per,id_usu)
);

CREATE TABLE pets_heaven.categorias_veterinario(
    id_cat INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom_cat VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.veterinarios(
    id_vet INT PRIMARY KEY,INDEX(id_vet),FOREIGN KEY(id_vet)  REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    especialidad VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    cat_vet INT NOT NULL,INDEX(cat_vet), FOREIGN KEY(cat_vet) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    fot_vet TEXT DEFAULT("https://img.freepik.com/vector-gratis/lindo-perro-medico-estetoscopio-dibujos-animados-vector-icono-ilustracion-animal-salud-icono-aislado_138676-5182.jpg") NOT NULL
);
CREATE TABLE pets_heaven.propietarios(
    id_pro INT PRIMARY KEY NOT NULL,INDEX(id_pro),FOREIGN KEY (id_pro) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    barrio VARCHAR(100) NOT NULL,
    fot_pro TEXT DEFAULT("https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png") NOT NULL
);
/* TABLA SIN FUNCIONALIDAD DEBERIA SER ELIMINADA*/
CREATE TABLE pets_heaven.administradores(
    id_admin INT PRIMARY KEY,INDEX(id_admin),FOREIGN KEY (id_admin) REFERENCES usuarios(id_usu) ON DELETE CASCADE
    ON UPDATE CASCADE,
    fec_ing DATE NOT NULL,
    fot_admin TEXT DEFAULT("https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png") NOT NULL
);

CREATE TABLE pets_heaven.mascotas(
    id_mas INT AUTO_INCREMENT PRIMARY KEY,
    nom_mas VARCHAR(100) NOT NULL,
    esp_mas VARCHAR(100) NOT NULL,
    col_mas VARCHAR(100) NOT NULL,
    raz_mas VARCHAR(100) NOT NULL,
    ali_mas VARCHAR(100) NOT NULL,
    fec_nac_mas DATE NOT NULL,
    pes_mas FLOAT(12,10) UNSIGNED NOT NULL,
    gen_mas ENUM('F','M') NOT NULL,
    id_pro_mas INT NOT NULL,INDEX(id_pro_mas),FOREIGN KEY (id_pro_mas) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    est_rep_mas VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT(1),
    fot_mas TEXT NOT NULL
);

CREATE TABLE pets_heaven.historiales_medicos(
    id_his INT PRIMARY KEY,
    fec_his DATE NOT NULL,
    tra_his  TEXT NOT NULL,
    des_his TEXT NOT NULL,
    id_vet_his INT NOT NULL,INDEX(id_vet_his),FOREIGN KEY (id_vet_his) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    id_mas_his INT NOT NULL,INDEX(id_mas_his),FOREIGN KEY (id_mas_his) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.categorias_ser(
    id_cat INT AUTO_INCREMENT PRIMARY KEY,
    nom_cat VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.servicios(
    id_ser INT AUTO_INCREMENT PRIMARY KEY,
    cat_ser INT NOT NULL,INDEX(cat_ser), FOREIGN KEY(cat_ser) REFERENCES categorias_ser(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    nom_ser VARCHAR(100) NOT NULL,
    pre_ser DECIMAL(10,2) NOT NULL,
    des_ser TEXT NOT NULL,
    tec_des_ser TEXT NOT NULL,
    img_ser TEXT NOT NULL,
    estado BOOLEAN DEFAULT(1) NOT NULL
);

CREATE TABLE pets_heaven.citas(
    id_cit INT AUTO_INCREMENT,
    fec_reg_cit DATE NOT NULL,
    fec_cit DATE NOT NULL,
    hor_cit TIME NOT NULL,
    ser_cit INT NOT NULL,INDEX(ser_cit),FOREIGN KEY(ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_cit INT NOT NULL,INDEX(vet_cit),FOREIGN KEY(vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    mas_cit INT NOT NULL,INDEX(mas_cit),FOREIGN KEY(mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE,
    estado ENUM("PENDIENTE","EN-ESPERA","CANCELADO","RECHAZADO","REALIZADO") NOT NULL,
    PRIMARY KEY (id_cit,mas_cit)
);