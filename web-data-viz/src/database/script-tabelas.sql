
CREATE DATABASE RPGin;

use RPGin;

CREATE TABLE usuario(
	id_user INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    telefone CHAR(11),
    email VARCHAR(100),
    senha CHAR(8),
    bio TEXT,
    imagem LONGTEXT
);

CREATE TABLE seguidor (
    id_seguido INT,
    id_seguidor INT,
    PRIMARY KEY(id_seguido, id_seguidor),
    FOREIGN KEY (id_seguido) REFERENCES usuario(id_user),
    FOREIGN KEY (id_seguidor) REFERENCES usuario(id_user)
);

CREATE TABLE postagem(
	id_postagem INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
    conteudo TEXT,
    data_postagem DATETIME DEFAULT CURRENT_TIMESTAMP,
    imagemPostagem LONGTEXT,
    id_user_fk INT,
		FOREIGN KEY(id_user_fk) REFERENCES usuario(id_user) 
);
CREATE TABLE comentario(
	id_comentario INT PRIMARY KEY AUTO_INCREMENT,
    id_user_fk INT,
    id_postagem_fk INT,
    mensagem VARCHAR(255),
    FOREIGN KEY(id_user_fk) REFERENCES usuario(id_user) ON DELETE CASCADE,
    FOREIGN KEY(id_postagem_fk) REFERENCES postagem(id_postagem) ON DELETE CASCADE
);
CREATE TABLE curtida(
    id_user_fk INT,
    id_postagem_fk INT,
		PRIMARY KEY(id_user_fk, id_postagem_fk),
	FOREIGN KEY(id_user_fk) REFERENCES usuario(id_user) ON DELETE CASCADE,
    FOREIGN KEY(id_postagem_fk) REFERENCES postagem(id_postagem) ON DELETE CASCADE
);

CREATE TABLE chat(
	id_chat INT PRIMARY KEY AUTO_INCREMENT,
    id_receptor INT,
    id_enviador INT,
    mensagem VARCHAR(200),
    foreign key (id_receptor) REFERENCES usuario(id_user),
    foreign key (id_enviador) REFERENCES usuario(id_user)
);

INSERT INTO usuario (id_user, nome, telefone, email, senha, bio) VALUES
(-1, 'ADM', '99999999999', 'adm@gmail.com', 'adm123', 'EU MANDO AQUI');
    
-- Inserindo usuários
INSERT INTO usuario (nome, telefone, email, senha, bio) VALUES
('Thiago Gomes', '11999999999', 'thiago@gmail.com', 'thi123', 'Mestre de RPG há 10 anos'),
('Vivian Silva', '21988888888', 'vivian@gmail.com', 'vi123', 'Mestre em D&D'),
('JP', '31977777777', 'JP@gmail.com', 'jp123', 'RPGista iniciante'),
('Mateus', '41966666666', 'mateus@gmail.com', 'teteu321', 'Narrador de campanhas sombrias'),
('Marcio', '51955555555', 'marcio@email.com', 'mar123', 'Fanática por mundos medievais'),
('Felipe', '77777777777', 'felipe@gmail.com', 'lipe123', 'Novo na comunidade!!');

INSERT INTO seguidor (id_seguido, id_seguidor) VALUES
(1, 2),
(2, 3),
(3, 4),
(4, 5),
(5, 1),
(1, 3),
(2, 4);

-- Postagens (4 postagens feitas por diferentes usuários)
INSERT INTO postagem (titulo, conteudo, id_user_fk) VALUES
('Introdução ao D&D', 'Dicas para iniciantes no mundo de Dungeons & Dragons.', 1),
('Construindo Mundos', 'Como criar seu próprio universo de RPG.', 2),
('Narrativas Imersivas', 'Torne sua campanha mais envolvente.', 3),
('Vilões Memoráveis', 'Como criar antagonistas interessantes.', 4);

INSERT INTO comentario (id_user_fk, id_postagem_fk, mensagem) VALUES
(2, 1, 'Muito útil para iniciantes!'),
(3, 1, 'Adorei as dicas!'),
(1, 2, 'Excelente conteúdo!'),
(5, 2, 'Vou usar essas ideias na próxima campanha.'),
(2, 3, 'Realmente imersivo!'),
(4, 3, 'Gostei do exemplo da floresta mágica.'),
(1, 4, 'Os vilões fazem toda a diferença.'),
(3, 4, 'Top demais, parabéns!');

INSERT INTO curtida (id_user_fk, id_postagem_fk) VALUES
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(5, 1);


