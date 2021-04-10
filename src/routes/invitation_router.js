const express = require("express");
const mongoose = require('mongoose')
const multer = require("multer");
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const url = process.env.MONGODB_URI;

const fileStorageEngine = new GridFsStorage({
  url: url,
  // db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'fs'
        };
        resolve(fileInfo);
      });
    });
  },
  options: { useUnifiedTopology: true }
});

const upload = multer({storage: fileStorageEngine});

const { invitation,
    editInvitation,
    events,
    newEvent,
    updateEvent,
    deleteEvent
} = require("../controllers/invitation_controller");

const router = express.Router();
const { adminAuth } = require("../middlewares");

router.get("/events", adminAuth, events);
router.post("/events/add/:id", adminAuth, newEvent);
router.post("/events/edit/:id", adminAuth, updateEvent);
router.delete("/events/delete/:id", adminAuth, deleteEvent);
router.get('/page/picture/:filename', (req, res) => {


  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo)

  conn.once('open', () => {
    // console.log("connection ok")
      gfs.collection('fs')
  })

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
  //check if files exist
  // console.log(gfs.files)
  if (!file || file.length == 0) {
      return res.status(404).json({
          err: "No files exist"
      })
  }
  //check if image
  if (file.contentType === 'image/jpeg' || file.contentType === "img/png") {
      //read output to browser
      const readStream = gfs.createReadStream(file.filename)
      readStream.pipe(res)
      console.log(res.file)
  } else {
      res.status(404).json({
          err: "Not an image"
      })
    }
  })
})
router.get("/page/:id", adminAuth, invitation);
router.post("/edit/:id", adminAuth, upload.single("picture"), editInvitation);
// router.post("/edit/:id", adminAuth, editInvitation);




module.exports = router;