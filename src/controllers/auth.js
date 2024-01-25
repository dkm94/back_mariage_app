const Admin = require("../models/admin");
const Mariage = require("../models/mariage");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET_KEY;
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// exports.register = (req, res) => {
//   let mariage = new Mariage({
//     ...req.body,
//   });
//   mariage
//     .save()
//     .then((newMariage) => {
//       const { firstPerson, secondPerson, email, password } = req.body;
//       if (!firstPerson || !secondPerson || !email || !password) {
//         return res
//           .status(422)
//           .json({ error: "Merci de renseigner tous les champs." });
//       }
//       let hash = bcrypt.hashSync(req.body.password, 10);
//       let admin = new Admin({
//         ...req.body,
//         password: hash,
//         role: "admin",
//         mariageID: newMariage._id,
//       });
//       admin
//         .save()
//         .then((data) => {
//           // const msg = {
//           //     to: admin.email,
//           //     from: "myweddingapp.mwa@gmail.com",
//           //     subject: "Votre compte a été créé avec succès.",
//           //     text: "<span>Rendez-vous sur votre tableau de bord pour commencer à visualiser les détais du mariage.</span>",
//           //     html: "<h1>Bienvenue sur My Wedding</h1>"
//           // }
//           // sgMail
//           // .send(msg)
//           // .then(() => {
//           //     console.log('Email sent')
//           // })
//           // .catch((error) => {
//           // console.error(error)
//           // })
//           res
//             .status(200)
//             .json({ success: true, message: "Accès autorisé, bienvenue sur votre compte." });
//         })
//         .catch((err) => res.status(400).json(err));
//     })
//     .catch((err) =>  res.status(500).json(err));
// };
exports.register = async (req, res) => {
  try {
    const { firstPerson, secondPerson, email, password } = req.body;
    
    if (!firstPerson || !secondPerson || !email || !password) {
      return res
        .status(422)
        .json({ success: false, message: "Tous les champs doivent être remplis" });
    }

    let mariage = new Mariage({
      ...req.body,
    });

    const newMariage = await mariage.save();

    let hash = bcrypt.hashSync(req.body.password, 10);
    let admin = new Admin({
      ...req.body,
      password: hash,
      role: "admin",
      mariageID: newMariage._id,
    });

    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Votre compte a été créé, vous pouvez dès à présent vous connecter" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur serveur"});
  }
};


exports.adminLogin = async function (req, res) {
  try {
    let token = null;
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Echec connexion, veuillez vérifier vos identifiants",
      });
    }

    bcrypt.compare(req.body.password, admin.password, async function (err, same) {

      if (!same) {
        return res.status(404).json({ success: false, message: "Echec connexion, veuillez vérifier vos identifiants" })
      }

      const mariage = await Mariage.findOne({ _id: admin.mariageID });
      if(!mariage){
        return res.status(404).json({ success: false, message: "Echec connexion, veuillez vérifier vos identifiants" })
      }
      
      token = jwt.sign(
        {
          id: admin._id,
          mariageID: admin.mariageID,
          role: admin.role,
          firstPerson: mariage.firstPerson,
          secondPerson: mariage.secondPerson,
        },
        jwt_secret
      );
      
      // if(token !== null){
      //   res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
      // }
      if(token === null) {
        return res.status(400).json({ success: false, message: "Echec connexion, veuillez vérifier vos identifiants" })
      }

      res.status(200).json({
        success: true,
        token: token,
        message: "Vous pouvez à présent accéder à votre compte.",
      });
      
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

exports.resetPassword = function (req, res) {
  
};
