DROP Table utilisateur;
CREATE Table utilisateur(
    id INTEGER auto_increment,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role BOOLEAN,
    PRIMARY KEY (id)
);

DROP Table commentaire;
CREATE Table commentaire(
    id INTEGER auto_increment,
    date_creation_commentaire DATE,
    message VARCHAR(255),
    PRIMARY KEY (id)
);
   
DROP Table technologie;
CREATE Table technologie(
    id INTEGER auto_increment,
    nom_techno VARCHAR(255),
    date_creation VARCHAR(255),
    nom_createur VARCHAR(255),
    PRIMARY KEY (id)
);
