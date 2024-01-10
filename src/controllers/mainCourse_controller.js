const Maincourse = require("../models/menu-plat")

exports.newMaincourse = (req, res) => {
    const mariageId = res.locals.mariageID;
    let maincourse = new Maincourse ({
        ...req.body,
        mariageID: mariageId
    });
    maincourse.save()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}

exports.maincourses = async (req, res, next) => {
    const { locals } = res;
    const mariageID = locals.mariageID;

    try {
        const maincourses = await Maincourse.find({ mariageID })
        
        if(!maincourses){
            res.send({ success: false, message: "Impossible de charger les plats du menu", statusCode: 404 })
            return;
        }

        res.send({ success: true, data: maincourses, statusCode: 200 });
    } catch (err) {
        res.send({ success: false, message: "Echec serveur", statusCode: 500 })
    }
}

exports.updateMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.updateOne({_id: req.params.id},
        {...req.body, _id: req.params.id, mariageID: mariageId})
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json ({ err }))
}

exports.deleteMaincourse = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    Maincourse.deleteOne({_id: req.params.id, mariageID: mariageId})
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json ({ err }))
}
