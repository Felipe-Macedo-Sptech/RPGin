
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

-- Inserir usuários
INSERT INTO usuario (nome, telefone, email, senha, bio) VALUES
('Ana Silva', '11999999999', 'ana@email.com', 'senha123', 'Amante de RPG medieval.'),
('Bruno Souza', '21988888888', 'bruno@email.com', 'senha456', 'Narrador de campanhas há 5 anos.'),
('Carla Mendes', '31977777777', 'carla@email.com', 'senha789', 'Jogadora de RPG investigativo.');

-- Inserir postagens
INSERT INTO postagem (titulo, conteudo, id_user_fk) VALUES
('Primeira aventura', 'Começando minha primeira aventura em D&D!', 1),
('Sistema de regras novo', 'Alguém conhece o sistema Savage Worlds?', 2),
('Preciso de grupo', 'Procuro grupo para jogar RPG online.', 3);

-- Inserir comentários
INSERT INTO comentario (id_user_fk, id_postagem_fk, mensagem) VALUES
(2, 1, 'Boa sorte na aventura!'),
(3, 1, 'Se precisar de dicas, chama!'),
(1, 2, 'Já ouvi falar, é muito rápido!');

-- Inserir curtidas
INSERT INTO curtida (id_user_fk, id_postagem_fk) VALUES
(2, 1),
(3, 1),
(1, 2),
(3, 2),
(1, 3);

SELECT * FROM postagem;
SELECT * FROM usuario;
SELECT * FROM curtida;

SELECT AVG(totalCurtidaPorPostagem) FROM (
SELECT p.id_postagem, COUNT(c.id_postagem_fk) as totalCurtidaPorPostagem FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem 
		group by  p.id_postagem
) as subQuerry;

SELECT COUNT(u.id_user) FROM usuario as u;


SELECT u.id_user, COUNT(u.id_user) as usuario, COUNT(p.id_postagem) as postagem FROM 
	usuario as u LEFT JOIN postagem as p ON p.id_user_fk = u.id_user
		GROUP BY u.id_user;


SELECT id_postagem as idPostagem, max(curtidas) as curtidas, nome as autorPostagem, id_user as idUsuario, titulo as tituloPostagem FROM (
SELECT p.id_postagem, count(c.id_postagem_fk)as curtidas, u.nome, u.id_user, p.titulo FROM 
	postagem as p JOIN curtida as c ON c.id_postagem_fk = p.id_postagem
    JOIN usuario as u ON p.id_user_fk = u.id_user
		group by  p.id_postagem LIMIT 1
) subzinha
group by id_postagem, nome, id_user, titulo;




