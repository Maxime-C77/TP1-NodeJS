const express = require('express')
const db = require('./database/database')
const bodyParser = require('body-parser');
const cors =require('cors')
const app= express() 
const utilisateurRoute = require('./routes/utilisateurRoute.js')
const commentaireRoute = require('./routes/commentaireRoute.js')
const technologieRoute = require('./routes/technologieRoute.js')
app.use(bodyParser.json())
app.use(cors())

app.use('/api/utilisateur', utilisateurRoute)
//app.use('api/commentaire', commentaireRoute)
app.use('api/technologie', technologieRoute)

app.listen(8000, ()=>{
    console.log("Serveur ouvert PORT 8000");
})