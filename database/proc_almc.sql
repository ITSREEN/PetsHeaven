DELIMITER //

CREATE PROCEDURE mascotas_db.InsertarAdministrador(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_direccion VARCHAR(100),
    IN p_telefono VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_contrasenna VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO mascotas_db.usuarios(
        nombre,
        apellido,
        direccion,
        telefono,
        es_propietario,
        es_veterinario,
        es_administrador,
        email,
        contrasenna
    )
    VALUES(
        p_nombre,
        p_apellido,
        p_direccion,
        p_telefono,
        0,
        0,
        1,
        p_email,
        p_contrasenna
    );

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE mascotas_db.InsertarVeterinario(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_direccion VARCHAR(100),
    IN p_telefono VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_contrasenna VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO mascotas_db.usuarios(
        nombre,
        apellido,
        direccion,
        telefono,
        es_propietario,
        es_veterinario,
        es_administrador,
        email,
        contrasenna
    )
    VALUES(
        p_nombre,
        p_apellido,
        p_direccion,
        p_telefono,
        0,
        1,
        0,
        p_email,
        p_contrasenna
    );

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE mascotas_db.InsertarPropietario(
    IN p_nombre VARCHAR(100),
    IN p_apellido VARCHAR(100),
    IN p_direccion VARCHAR(100),
    IN p_telefono VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_contrasenna VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO mascotas_db.usuarios(
        nombre,
        apellido,
        direccion,
        telefono,
        es_propietario,
        es_veterinario,
        es_administrador,
        email,
        contrasenna
    )
    VALUES(
        p_nombre,
        p_apellido,
        p_direccion,
        p_telefono,
        1,
        0,
        0,
        p_email,
        p_contrasenna
    );

    COMMIT;
    SET autocommit = 1;
END //