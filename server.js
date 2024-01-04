const express = require('express')
const app= express() 
const cors =require('cors')

const utilisateurRoute = require('./routes/utilisateurRoute.js')
//const commentaireRoute = require('./routes/commentaireRoute.js')
const technologieRoute = require('./routes/technologieRoute.js')

app.use(express.json())
app.use(cors())

app.use('/api/utilisateur', utilisateurRoute)
//app.use('/commentaire', commentaireRoute)
app.use('/api/technologie', technologieRoute)

app.listen(8000, function(){
    console.log("Serveur ouvert PORT 8000");
})

module.exports = app;