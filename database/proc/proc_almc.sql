DELIMITER //
CREATE PROCEDURE pets_heaven.RegistPeoples(
    IN p_nom_usu VARCHAR(100),
    IN p_ape_usu VARCHAR(100),
    IN p_fec_nac_usu DATE,
    IN p_tip_doc_usu VARCHAR(10),
    IN p_doc_usu VARCHAR(20),
    IN p_dir_usu VARCHAR(100),
    IN p_cel_usu VARCHAR(20),
    IN p_cel2_usu VARCHAR(20),
    IN p_email_usu VARCHAR(100),
    IN p_cont_usu VARCHAR(255)
)
BEGIN
    DECLARE p_id_usuario INT;
    DECLARE p_id_rol INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
     BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    SET autocommit = 0;

    START TRANSACTION;

    INSERT INTO usuarios (nom_usu,ape_usu,tip_doc_usu,doc_usu,dir_usu,cel_usu,cel2_usu,email_usu,cont_usu)
    VALUES (p_nom_usu,p_ape_usu,p_tip_doc_usu,p_doc_usu,p_dir_usu,p_cel_usu,p_cel2_usu,p_email_usu,p_cont_usu,DEFAULT);

    SET p_id_usuario = LAST_INSERT_ID();

    INSERT INTO roles(nom_rol)
    VALUES (nom_rol)
    ON DUPLICATE KEY UPDATE id_rol = LAST_INSERT_ID(id_rol);

    SET p_id_rol = LAST_INSERT_ID();

    INSERT INTO otorgar_roles(id_usu,fec_oto)
    VALUES (id_usuario,NOW());

    COMMIT;
    SET autocommit = 1;
END //

CREATE PROCEDURE pets_heaven.SearchPeoples()
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu
    FROM 
        usuarios u
    WHERE
        u.estado = 1
    LIMIT 40;
END //

CREATE PROCEDURE pets_heaven.SearchRoles(
    IN p_attribue VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.fec_nac_usu,
        u.tip_doc_usu,
        u.doc_usu,
        u.dir_usu,
        u.cel_usu,
        u.cel2_usu,
        u.email_usu,
        u.cont_usu,
        r.nom_rol
    FROM
        usuarios u
    JOIN
        otorgar_roles oro ON oro.id_rol = u.id_usu
    JOIN
        roles r ON oro.id_rol = r.id_rol
    WHERE
        u.estado = 1
        AND (
            u.doc_usu = p_attribue OR 
            u.email_usu LIKE p_attribue
        )
    LIMIT 40;
END //