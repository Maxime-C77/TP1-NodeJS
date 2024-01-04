const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../database/database')

exports.authenticator = (req, res, next) =>{
    // récupérer le token
    const token = req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            // décoder => next()
            else{
                console.log(decoded);
                const result = await db.query('SELECT role FROM utilisateur where email= ?',[decoded.email])
                if(result.length === 1 && result[0].role === 1){
                    next()
                }
                else{
                    res.status(403).json({erreur: "access denied"})
                }
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}