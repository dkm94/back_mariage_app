const Guest = require('../models/invite');

exports.getGuestbyName = (req, res, next) => {
    const mariageId = res.locals.mariageID;
    console.log("query", req.query)
    Guest.find({ name: req.query.name, mariageID: mariageId })
        .populate({path: "tableID", select: "name"})
        .exec()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json( err ))
}