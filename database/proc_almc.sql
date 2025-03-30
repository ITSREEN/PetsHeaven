DELIMITER //

CREATE PROCEDURE SearchPeoples()
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.tip_usu,
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

CREATE PROCEDURE SearchRoles(
    IN p_attribue VARCHAR(100)
)
BEGIN
    SELECT
        u.nom_usu,
        u.ape_usu,
        u.tip_usu,
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