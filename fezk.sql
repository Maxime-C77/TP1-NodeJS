CREATE Table utilisateur(
    id INTEGER auto_increment,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    PRIMARY KEY (id)
);

CREATE Table commentaire(
    id INTEGER auto_increment,
    date_creation_commentaire VARCHAR(255),
    PRIMARY KEY (id)
);
   
CREATE Table technologie(
    id INTEGER auto_increment,
    nom_techno VARCHAR(255),
    PRIMARY KEY (id)
);
