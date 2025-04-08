<<<<<<< HEAD
-- Active: 1743681932025@@127.0.0.1@3306@pets_heaven
=======
-- Active: 1741175022404@@127.0.0.1@3306@pets_heaven
>>>>>>> cc328b9d44350a2da28bd0aa26b17ae1b5c81475
CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.nom_ser,
        c.nom_cat,
        s.pre_ser,
        s.des_ser,
        s.tec_des_ser,
        s.img_ser
    FROM
        servicios s
    JOIN
        categorias_ser c ON c.id_cat = s.cat_ser
    WHERE
        s.estado = 1
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