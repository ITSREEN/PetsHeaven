-- Active: 1740764800080@@127.0.0.1@3306@pets_heaven
CREATE PROCEDURE pets_heaven.RegistPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
    IN p_usuario VARCHAR(100),
    IN p_gen_mas VARCHAR(2),
    IN p_est_rep_mas VARCHAR(100),
    IN p_fot_mas TEXT
)
BEGIN
    DECLARE p_id_pro_mas INT;
        DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    SELECT u.id_usu INTO p_id_pro_mas 
    FROM 
        usuarios u 
    WHERE 
        u.doc_usu = p_usuario 
        OR u.email_usu = p_usuario;

    INSERT INTO pets_heaven.mascotas (nom_mas,esp_mas,col_mas,raz_mas,ali_mas,fec_nac_mas,pes_mas,gen_mas,id_pro_mas,est_rep_mas,fot_mas)
    VALUES(p_nom_mas,p_esp_mas,p_col_mas,p_raz_mas,p_ali_mas,p_fec_nac_mas,p_pes_mas,p_gen_mas,p_id_pro,p_est_rep_mas,p_fot_mas);

    COMMIT;
    SET autocommit = 1;
END //
CREATE PROCEDURE pets_heaven.ModifyPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
    IN p_usuario VARCHAR(100),
    IN p_gen_mas VARCHAR(2),
    IN p_est_rep_mas VARCHAR(100),
    IN p_fot_mas TEXT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    UPDATE
        mascotas m, usuarios u
    SET 
        m.nom_mas = p_nom_mas,
        m.esp_mas = p_esp_mas,
        m.col_mas = p_col_mas,
        m.raz_mas = p_raz_mas,
        m.ali_mas = p_ali_mas,
        m.fec_nac_mas = p_fec_nac_mas,
        m.pes_mas = p_pes_mas,
        m.gen_mas = p_gen_mas,
        m.est_rep_mas = p_est_rep_mas,
        m.fot_mas = p_fot_mas
    WHERE
        m.estado = 1
        AND (
            u.doc_usu = p_usuario 
            OR u.email_usu = p_usuario
        )
        AND m.id_pro_mas = u.id_usu;

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPets()
BEGIN

    SELECT
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
    ORDER BY 
        m.nom_mas
    LIMIT 40;

END //

CREATE PROCEDURE pets_heaven.SearchPetBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            u.nom_usu = p_by
            OR u.doc_usu = p_by
            OR u.email_usu = p_by
        )
    ORDER BY 
        m.nom_mas
    LIMIT 40;

END //

CREATE PROCEDURE pets_heaven.SearchPetsBy(
    IN p_by VARCHAR(100)
)
BEGIN
    SELECT
        m.nom_mas,
        m.esp_mas,
        m.col_mas,
        m.raz_mas,
        m.ali_mas,
        m.fec_nac_mas,
        m.pes_mas,
        m.gen_mas,
        m.est_rep_mas,
        m.fot_mas,
        u.nom_usu,
        u.ape_usu,
        u.doc_usu,
        u.cel_usu,
        u.email_usu,
        u.gen_usu
    FROM 
        mascotas m
    JOIN
        usuarios u ON u.id_usu = m.id_pro_mas
    WHERE 
        m.estado = 1
        AND u.estado = 1
        AND (
            m.nom_mas LIKE p_by
            OR m.raz_mas LIKE p_by
            OR m.esp_mas LIKE p_by
        )
    ORDER BY m.nom_mas
    LIMIT 40;

END //

CALL `SearchPetsBy`("gato");