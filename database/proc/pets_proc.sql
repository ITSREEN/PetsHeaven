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

    SELECT 1 FROM usuarios u 
    WHERE 
        u.doc_usu LIKE p_usuario 
        OR u.email_usu LIKE p_usuario;

    SET p_id_pro_mas = LAST_INSERT_ID();

    INSERT INTO pets_heaven.mascotas (nom_mas,esp_mas,col_mas,raz_mas,ali_mas,fec_nac_mas,pes_mas,gen_mas,id_pro_mas,est_rep_mas,fot_mas)
    VALUES(p_nom_mas,p_esp_mas,p_col_mas,p_raz_mas,p_ali_mas,p_fec_nac_mas,p_pes_mas,p_gen_mas,p_id_pro,p_est_rep_mas,p_fot_mas);

    COMMIT;
    SET autocommit = 1;
END //