const express = require('express')
const router = express.Router()
const utilisateurController = require('../controllers/utilisateurController.js')
const middleware = require('../middleware/middleware')

router.get('/utilisateur', middleware.authenticator, utilisateurController.getAllUser)
router.get('/utilisateur/:id', utilisateurController.getUser)
/*router.post('/utilisateur/:nom', utilisateurController.AddUser)
router.put('/utilisateur/:nom', utilisateurController.UpdateUser)
router.delete('/utilisateur/:nom', utilisateurController.DeleteUser)*/

router.post('/login', utilisateurController.Login)
router.post('/register', utilisateurController.Register)

module.exports = router;