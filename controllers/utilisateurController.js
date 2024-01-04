const db = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


exports.getAllUser= async(req, res) => {
    const sql = "SELECT * from utilisateur";
    const resultat = await db.query(sql);
    console.log(resultat)
    res.status(200).json(resultat);
}

exports.getUser = function(req, res){
    let nom = req.params.nom
    leUtilisateur = utilisateur.find(utilisateur => utilisateur.nom === nom)
    res.status(200).json(leUtilisateur)
}
 
/*exports.AddUser =  async (req, res)=>{
    console.log(req.body);
    await db.query(`insert into utilisateur(nom, prenom, email) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.email})`)
    res.status(200).json("utilisateur ajouté")
}

exports.UpdateUser = (req, res) => {
    const id = parseInt(req.params.id)
    let leUtilisateur = utilisateur.find(utilisateur => utilisateur.id === id)
    leUtilisateur.nom = req.body.nom,
    leUtilisateur.prenom = req.body.prenom,
    leUtilisateur.email = req.body.email,
    res.status(200).json(leUtilisateur)
}

exports.DeleteUser = (req, res) => {
    const id = parseInt(req.params.id)
    let leUtilisateur = utilisateur.find(utilisateur => utilisateur.id === id)
    utilisateur.splice(utilisateur.indexOf(leUtilisateur),1)
    res.status(200).json(utilisateur)
}*/

exports.Register = async (req, res) => {
    try {
        const {email, password} = req.body
        conn = await db.pool.getConnection()
        const result = await conn.query('Select * from utilisateur where email = ?', [email])
        conn.release()
        if (result.lenght > 0)
        {
            return res.status(400).json({error: 'Cet utilisateur existe déjà.'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const insertUserQuery = 'Insert into utilisateur(email, password) Values(?, ?)'
        const insertUserValues = [email, hashedPassword]
        await conn.query(insertUserQuery, insertUserValues)
        conn.release()
        const token = jwt.sign({email}, process.env.API_KEY, {expiresIn: '1h'})
        res.json({token})
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Erreur lors de l\'inscription.'})
    }
}

exports.Login = async (req, res) => {
    try {
        const {email, password} = req.body
        conn = await db.pool.getConnection()
        const result = await conn.query('Select * from utilisateur where email = ?', [email])
        conn.release()
        if (result.lenght === 0)
        {
            return res.status(401).json({error: 'Utilisateur non trouvé.'})
        }
        const user = result[0]
        const passwordMatch = await bcrypt.compare(password , user.password)
        if(!passwordMatch)
        {
            return res.status(401).json({error: 'Mot de passe incorrect.'})
        }
        const token = jwt.sign({email: utilisateur.email}, process.env.API_KEY, {expiresIn: '1h'})
        res.json({token})
    } catch(error) {
        console.error(error)
        res.status(500).json({error: 'Erreur lors de l\'inscription.'})
    }
}