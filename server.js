const express = require('express')
const app= express()
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
const utilisateur = require('./utilisateur.json')
const db = require('./database.js')
const cors =require('cors')

app.use(express.json())
app.use(cors())

function lireFichier() {
    const data = fs.readFileSync('utilisateur.json', 'utf8');
    return JSON.parse(data);
}

function afficherListe() {
    const utilisateur = lireFichier();
    console.log('Liste des utilisateurs :');
    utilisateur.forEach(utilisateur => {
      console.log(`${utilisateur.nom} ${utilisateur.prenom}, ${utilisateur.email}`);
    });
    rl.close();
}
function afficherCommentaire() {
    const utilisateur = lireFichier();
    console.log('Liste des utilisateurs :');
    utilisateur.forEach(utilisateur => {
      console.log(`${utilisateur.nom} ${utilisateur.prenom}, ${utilisateur.email}`);
    });
    rl.close();
}

function ajouterUtilisateur(nom, prenom, email) {
    const utilisateur = lireFichier();
    utilisateur.push({ nom, prenom, email });
    fs.writeFileSync('utilisateur.json', JSON.stringify(utilisateur, null, 2), 'utf8');
    console.log('Utilisateur ajoutée avec succès !');
    rl.close(); 
}

function main() {
    console.log('Bienvenue dans le gestionnaire des utilisateurs !');
    console.log('1. Ajouter un utilisateur');
    console.log('2. Afficher la liste des utilisateurs');
    rl.question('Veuillez choisir une option (1 ou 2) : ', (choix) => {
      choix = parseInt(choix);
  
      switch (choix) {
        case 1:
          rl.question("Nom de l'utilisateur : ", (nom) => {
            rl.question("Prénom de l'utilisateur : ", (prenom) => {
              rl.question("Email de l'utilisateur : ", (email) => {
                ajouterUtilisateur(nom, prenom, email);
              });
            });
          });
          break;
        case 2:
          afficherListe();
          break;
        default:
          console.log('Option invalide. Veuillez choisir une option valide.');
          rl.close();
      }
    });
}

main()

app.get('/utilisateur', function(req, res){
    res.status(200).json(utilisateur)
})

app.get('/utilisateur/:nom', function(req, res){
    let nom = req.params.nom
    leUtilisateur = utilisateur.find(utilisateur => utilisateur.nom === nom)
    res.status(200).json(leUtilisateur)
})
 
app.post('/utilisateur', async (req, res)=>{
    utilisateur.push(req.body)
    res.status(200).json(utilisateur)
})

app.put('/utilisateur/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let leUtilisateur = utilisateur.find(utilisateur => utilisateur.id === id)
    leUtilisateur.nom = req.body.nom,
    leUtilisateur.prenom = req.body.prenom,
    leUtilisateur.email = req.body.email,
    res.status(200).json(leUtilisateur)
})

app.delete('/utilisateur/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let leUtilisateur = utilisateur.find(utilisateur => utilisateur.id === id)
    utilisateur.splice(utilisateur.indexOf(leUtilisateur),1)
    res.status(200).json(utilisateur)
})

app.listen(8000, function(){
    console.log("\nServeur ouvert PORT 8000");
})