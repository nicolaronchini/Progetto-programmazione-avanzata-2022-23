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
    richiesteVal INT(10) NOT NULL,
    token INT(10) NOT NULL,
    PRIMARY KEY(email)
);

ALTER TABLE segnalazione
  ADD PRIMARY KEY (id);

ALTER TABLE segnalazione
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO segnalazione (timestamp, latitudine, longitudine, tipologia, severita, email, stato) VALUES
('2022-02-15 14:30', 42.12, 7.13, "buca", "bassa", "ronchini.nicola@outlook.it", "PENDING"),
('2022-02-15 8:00', 32.12, 6.13, "avvallamento", "alta","filippo_bernabucci@gmail.com", "VALIDATED"),
('2021-02-15 13:30:00',33.67,18.5,"buca","media","mariorossi@virgilio.it","PENDING"),
('2021-02-15 15:35:00',39.42,9.46,"buca","alta","filippo_bernabucci@gmail.com","PENDING"),
('2022-04-15 14:30:00',35.12,19.00,"avvallamento","media","ronchini.nicola@outlook.it","REJECTED"),
('2023-07-06 11:48:41',25.12,7.89,"avvallamento","alta","chiara_verdi@gmail.com","VALIDATED"),
('2023-07-06 07:53:26',12.13,80.90,"buca","bassa","lucabianchi@hotmail.it","PENDING"),
('2023-07-06 15:55:09',45.00,70.00,"avvallamento","alta","giovanni_marone@outlook.it","PENDING"),
('2023-07-04 16:10:11',32.67,18.98,"avvallamento","bassa","mariorossi@virgilio.it","PENDING"),
('2023-08-06 15:44:33',33.89,33.89,"buca","media","filippo_bernabucci@gmail.com","PENDING"),
('2023-07-06 07:53:26',17.13,56.90,"avvallamento","bassa","lucabianchi@hotmail.it","PENDING"),
('2023-03-09 14:30', 49.12, 47.13, "buca", "bassa", "ronchini.nicola@outlook.it", "PENDING"),
('2023-06-14 11:47:00',35.67,28.5,"avvallamento","media","mariorossi@virgilio.it","PENDING"),
('2023-03-08 07:53:26',18.13,60.90,"avvallamento","bassa","lucabianchi@hotmail.it","PENDING");

INSERT INTO utenti (email, nome, cognome, ruolo, coins, richiesteVal,token) VALUES
("adrianomancini@gmail.com","adriano","mancini", "admin",0.0,0,0),
("ronchini.nicola@outlook.it","nicola","ronchini","utente",3.15,4,5),
("filippo_bernabucci@gmail.com","filippo","bernabucci","utente",4.35,11,3),
("mariorossi@virgilio.it","mario","rossi","utente",10.6,19,1),
("lucabianchi@hotmail.it","luca","bianchi","utente",4.25,7,4),
("chiara_verdi@gmail.com","chiara","verdi","utente",3.75,5,7),
("giovanni_marone@outlook.it","giovanni","marone","utente",2.5,4,3);
