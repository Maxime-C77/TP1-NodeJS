const express = require('express')
const router = express.Router()
const technologieController = require('../controllers/technologieController.js')

router.get('/technologie', technologieController.getAllTechnologie)
router.get('/technologie/:id', technologieController.getTechnologie)
router.post('/technologie/:nom', technologieController.AddTechnologie)
router.put('/technologie/:nom', technologieController.UpdateTechnologie)
router.delete('/technologie/:nom', technologieController.DeleteTechnologie)

module.exports = router;