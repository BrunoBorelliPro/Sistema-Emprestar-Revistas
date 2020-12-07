-- SQLite

CREATE TABLE caixa(
    id_caixa INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    cor text
);
CREATE TABLE amigo(
    id_amigo INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    nome text,
    nome_mae text,
    telefone text,
    local_conhecido text
);
CREATE TABLE revista(
    id_revista INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    titulo text,
    tema text,
    volume int,
    id_caixa_fk INTEGER NOT NULL,
    FOREIGN KEY(id_caixa_fk) REFERENCES caixa(id_caixa)
);
CREATE TABLE Revista_emprestada(
    id_revista_fk INTEGER PRIMARY KEY,
    id_amigo_fk INTEGER,
    FOREIGN KEY(id_amigo_fk) REFERENCES amigo(id_amigo_fk),
    FOREIGN KEY(id_revista_fk) REFERENCES revista(id_revista)
);

SELECT * FROM CAIXA;
DROP TABLE Revista_emprestada;
INSERT INTO caixa VALUES (NULL,"vermelho");