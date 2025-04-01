CREATE PROCEDURE pets_heaven.RegistPets(
    IN p_nom_mas VARCHAR(100),
    IN p_esp_mas VARCHAR(100),
    IN p_col_mas VARCHAR(100),
    IN p_raz_mas VARCHAR(100),
    IN p_ali_mas VARCHAR(100),
    IN p_fec_nac_mas DATE,
    IN p_pes_mas FLOAT,
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

    INSERT INTO

    COMMIT;
    SET autocommit = 1;
END //