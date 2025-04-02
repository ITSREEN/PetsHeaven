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