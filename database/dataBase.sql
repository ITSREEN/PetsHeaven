-- Active: 1725413700917@@127.0.0.1@3306@pets_heaven
DROP DATABASE IF EXISTS pets_heaven;
CREATE DATABASE IF NOT EXISTS pets_heaven;

CREATE TABLE pets_heaven.roles(
    id_rol VARCHAR(20) PRIMARY KEY,
    nom_rol VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.permisos(
    id_per VARCHAR(20) PRIMARY KEY,
    nom_per VARCHAR(100) NOT NULL
);
/* DIVIDIR USUARIOS EN DOS TABLAS USUARIOS Y PERSONAS LOS USUARIOS TENDRAN LA INFORMACION RELEVANTE CON LA AUTENTICACION Y LAS PERSONAS EL RESTO DE INFORMACION */
CREATE TABLE pets_heaven.usuarios(
    id_usu VARCHAR(20) PRIMARY KEY,
    nom_usu VARCHAR(100) NOT NULL,
    ape_usu VARCHAR(100) NOT NULL,
    tip_doc_usu VARCHAR(10) NOT NULL,
    doc_usu VARCHAR(20) UNIQUE NOT NULL,INDEX(doc_usu),
    dir_usu VARCHAR(100) NOT NULL,
    cel_usu VARCHAR(20) NOT NULL,
    cel2_usu VARCHAR(20),
    email_usu VARCHAR(100) UNIQUE NOT NULL,INDEX(email_usu),
    cont_usu VARCHAR(255) NOT NULL,
    estado BOOLEAN DEFAULT(1)
);

CREATE TABLE pets_heaven.otorgar_roles(
    id_rol VARCHAR(20) NOT NULL,INDEX(id_rol),FOREIGN KEY(id_rol) REFERENCES roles(id_rol) ON DELETE CASCADE ON UPDATE CASCADE,
    id_usu VARCHAR(20) NOT NULL,INDEX(id_usu),FOREIGN KEY(id_usu) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_rol,id_usu)
);

CREATE TABLE pets_heaven.otorgar_permisos(
    id_per VARCHAR(20) NOT NULL,INDEX(id_per),FOREIGN KEY(id_per) REFERENCES permisos(id_per) ON DELETE CASCADE ON UPDATE CASCADE,
    id_usu VARCHAR(20) NOT NULL,INDEX(id_usu),FOREIGN KEY(id_usu) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    fec_oto DATE DEFAULT(NOW()) NOT NULL,
    PRIMARY KEY(id_per,id_usu)
);

CREATE TABLE pets_heaven.veterinarios(
    id_vet VARCHAR(20) PRIMARY KEY NOT NULL,INDEX(id_vet),FOREIGN KEY(id_vet)  REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    especialidad VARCHAR(100) NOT NULL,
    horarios VARCHAR(100) NOT NULL,
    cat_vet VARCHAR(20) NOT NULL,INDEX (cat_vet) FOREIGN KEY(cat_vet) REFERENCES categorias_veterinario(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    fot_vet TEXT DEFAULT("https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png") NOT NULL
);
CREATE TABLE pets_heaven.propietarios(
    id_pro VARCHAR(20) PRIMARY KEY NOT NULL,INDEX(id_pro),FOREIGN KEY (id_pro) REFERENCES usuarios(id_usu) ON DELETE CASCADE ON UPDATE CASCADE,
    barrio VARCHAR(100) NOT NULL,
    fot_pro TEXT DEFAULT("https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png") NOT NULL
);
/* TABLA SIN FUNCIONALIDAD DEBERIA SER ELIMINADA*/
CREATE TABLE pets_heaven.administradores(
    id_admin VARCHAR(20) PRIMARY KEY,INDEX(id_admin),FOREIGN KEY (id_admin) REFERENCES usuarios(id_usu) ON DELETE CASCADE
    ON UPDATE CASCADE,
    fec_ing DATE NOT NULL
    fot_admin TEXT DEFAULT("https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png") NOT NULL
);

CREATE TABLE pets_heaven.mascotas(
    id_mas VARCHAR(20) PRIMARY KEY,
    nom_mas VARCHAR(100) NOT NULL,
    esp_mas VARCHAR(100) NOT NULL,
    raz_mas VARCHAR(100) NOT NULL,
    eda_mas FLOAT(12,10) UNSIGNED NOT NULL,
    pes_mas FLOAT(12,10) UNSIGNED NOT NULL,
    sexo ENUM('F','M') NOT NULL,
    id_pro_mas VARCHAR(20) NOT NULL,INDEX(id_pro_mas),FOREIGN KEY (id_pro_mas) REFERENCES propietarios(id_pro) ON DELETE CASCADE ON UPDATE CASCADE,
    estado BOOLEAN DEFAULT(1),
    fot_mas TEXT NOT NULL
);

CREATE TABLE pets_heaven.historiales_medicos(
    id_his VARCHAR(20) PRIMARY KEY,
    fec_his DATE NOT NULL,
    tra_his  TEXT NOT NULL,
    des_his TEXT NOT NULL,
    id_vet_his VARCHAR(20) NOT NULL,INDEX(id_vet_his),FOREIGN KEY (id_vet_his) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    id_mas_his VARCHAR(20) NOT NULL,INDEX(id_mas_his),FOREIGN KEY (id_mas_his) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pets_heaven.categorias_ser(
    id_cat VARCHAR(20) PRIMARY KEY,
    nom_cat VARCHAR(100) NOT NULL
);

CREATE TABLE pets_heaven.servicios(
    id_ser VARCHAR(20) PRIMARY KEY,
    cat_ser VARCHAR(20) NOT NULL,INDEX(cat_ser), FOREIGN KEY(cat_ser) REFERENCES categorias_ser(id_cat) ON DELETE CASCADE ON UPDATE CASCADE,
    nom_ser VARCHAR(100) NOT NULL,
    pre_ser DECIMAL(10,2) NOT NULL,
    des_ser TEXT NOT NULL,
    tec_des_ser TEXT NOT NULL,
    img_ser TEXT NOT NULL
);

CREATE TABLE pets_heaven.citas(
    id_cit VARCHAR(20),
    fec_reg_cit DATE NOT NULL,
    fec_cit DATE NOT NULL,
    hor_cit TIME NOT NULL,
    ser_cit VARCHAR(20) NOT NULL,INDEX(ser_cit),FOREIGN KEY(ser_cit) REFERENCES servicios(id_ser) ON DELETE CASCADE ON UPDATE CASCADE,
    vet_cit VARCHAR(20) NOT NULL,INDEX(vet_cit),FOREIGN KEY(vet_cit) REFERENCES veterinarios(id_vet) ON DELETE CASCADE ON UPDATE CASCADE,
    mas_cit VARCHAR(20) NOT NULL,INDEX(mas_cit),FOREIGN KEY(mas_cit) REFERENCES mascotas(id_mas) ON DELETE CASCADE ON UPDATE CASCADE,
    estado ENUM("PENDIENTE","EN-ESPERA","CANCELADO","RECHAZADO","REALIZADO") NOT NULL,
    PRIMARY KEY (id_cit,mas_cit)
);