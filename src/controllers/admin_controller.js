const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

const findAdminById = async (id) => {
    const admin = await Admin.findById({ _id: id })
    return admin;
}   

exports.admins = async (req, res) => {
    try {
        const admins = await Admin.find()
        
        if(!admins){
            res.status(404).json({ success: false, message: "Liste d'admins introuvable !" })
            return;
        }

        res.status(200).json({ success: true, data: admins });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.admin = async (req, res) => {
    try {
        const admin = await findAdminById(req.params.id)

    if(!admin) {
        res.status(404).json({ success: false, message: "Compte introuvable !" })
        return;
    }

    res.status(200).json({ success: true, data: admin });
    } catch (err) {
        res.status(500).json({ success: false, message: "Echec serveur" })
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const adminId = res.locals.adminId;
        const mariageId = res.locals.mariageID;

        const existingAdmin = await findAdminById(adminId);
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: "Impossible de trouver les données liées à votre compte" });
        }

        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash;

        const result = await Admin.updateOne(
            { _id: adminId },
            { $set: { password: hash, ...req.body, mariageID: mariageId } }
        );

        if (result.nModified === 1) {
            res.status(200).json({ success: true, message: "Modification enregistrée" });
        } else {
            res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression de votre compte" });
        }

        res.status(200).json({ success: true, message: "Modification enregistrée" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la mise à jour de l'administrateur." });
    }
}

exports.deleteAccount = async (req, res, next) => {
    try {
        const existingAdmin = await findAdminById(req.params.id)
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: "Votre compte est introuvable !" });
        }

        await existingAdmin.remove();
        res.status(200).json({ success: true, message: "Votre compte a été supprimé avec succès" });
    } catch (err) {
        res.status(400).json({ success: false, message: "Oups, une erreur s'est produite lors de la suppression du compte" });
    }
}
