CREATE TABLE segnalazione (
    id INT(10) NOT NULL,
    timestamp DATETIME NOT NULL,
    latitudine FLOAT NOT NULL,
    longitudine FLOAT NOT NULL,
    tipologia VARCHAR(100) NOT NULL,
    severita VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    stato VARCHAR(100) NOT NULL
);
CREATE TABLE utenti (
    email VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    cognome VARCHAR(100) NOT NULL,
    ruolo VARCHAR(100) NOT NULL,
    coins FLOAT NOT NULL,
    token INT(10) NOT NULL,
    PRIMARY KEY(email)
);

ALTER TABLE segnalazione
  ADD PRIMARY KEY (id);

ALTER TABLE segnalazione
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO segnalazione (timestamp, latitudine, longitudine, tipologia, severita, email, stato) VALUES
('2022-02-15 14:30', 42.12, 45.13, "buca", "bassa", "ronchini.nicola@outlook.it", "PENDING"),
('2022-02-15 8:00', 32.12, 65.13, "avvallamento", "alto","filippo_bernabucci@gmail.com", "VALIDATED");
INSERT INTO utenti (email, nome, cognome, ruolo, coins, token) VALUES
("adrianomancini@gmail.com","adriano","mancini", "admin",0.0,10),
("ronchini.nicola@outlook.it","nicola","ronchini","utente",3.15,5),
("filippo_bernabucci@gmail.com","filippo","bernabucci","utente",4.35,3);