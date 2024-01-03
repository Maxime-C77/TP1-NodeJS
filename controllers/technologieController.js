const db = require('../database/database')
const express = require('express')
const app= express()
app.use(express.json())


exports.getAllTechnologie= function(req, res){
    res.status(200).json(technologie)
}

exports.getTechnologie = function(req, res){
    let nom = req.params.nom_techno
    laTechnologie = technologie.find(technologie => technologie.nom_techno === nom)
    res.status(200).json(laTechnologie)
}
 
exports.AddTechnologie =  async (req, res)=>{
    console.log(req.body);
    await db.query(`insert into technologie(nom_techno, date_creation, nom_createur) VALUES ('${req.body.nom_techno}', '${req.body.date_creation}', '${req.body.nom_createur})`)
    res.status(200).json("technologie ajouté")
}

exports.UpdateTechnologie = (req, res) => {
    const id = parseInt(req.params.id)
    let laTechnologie = technologie.find(technologie => technologie.id === id)
    laTechnologie.nom_techno = req.body.nom_techno,
    laTechnologie.date_creation = req.body.date_creation,
    laTechnologie.nom_createur = req.body.nom_createur,
    res.status(200).json(laTechnologie)
}

exports.DeleteTechnologie = (req, res) => {
    const id = parseInt(req.params.id)
    let laTechnologie = technologie.find(technologie => technologie.id === id)
    technologie.splice(technologie.indexOf(laTechnologie),1)
    res.status(200).json(technologie)
}