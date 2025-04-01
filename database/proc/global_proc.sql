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

CREATE PROCEDURE pets_heaven.SearchServices()
BEGIN
    SELECT
        s.nom_ser,
        s.cat_ser,
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