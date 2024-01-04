const express = require("express");
const mongoose = require('mongoose')
const multer = require("multer");
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const url = process.env.MONGODB_URI;

const { newGuest,
    guest,
    guests,
    updateGuest,
    updateFile,
    deleteGuest,
    getGuestbyName,
    addGuestToTable,
    deleteGuestFromTable
} = require("../controllers/guest_controller");
const { adminAuth } = require("../middlewares");

const router = express.Router();

const fileStorageEngine = new GridFsStorage({
    url: url,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
        //   const contentType = ["image/jpeg", "image/png"];
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'fs',
            // contentType: contentType
          };
          resolve(fileInfo);
        });
      });
    },
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  });
  
const upload = multer({storage: fileStorageEngine});

router.post("/add", adminAuth, newGuest);
router.get("/id/:id", adminAuth, guest);
router.get("/name/:name", adminAuth, getGuestbyName);
router.get("/", adminAuth, guests);
router.get('/media/:filename', (req, res) => {
    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo)
    conn.once('open', () => {
        gfs.collection('fs')
    })
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length == 0) {
          return res.status(404).json({
              err: "No files exist"
          })
      }
    //check if image
    if (file.contentType === 'image/jpeg' || file.contentType === "image/png") {
        //read output to browser
        const readStream = gfs.createReadStream(file.filename)
        readStream.pipe(res)
    } else {
        res.status(404).json({
            err: "Not an image"
        })
      }
    })
  })
router.post("/edit/:id", adminAuth, upload.single("media"), updateGuest);
router.delete("/delete/:id", adminAuth, deleteGuest);
router.post("/addtable/:id", adminAuth, addGuestToTable);
router.put("/deletetable/:id", adminAuth, deleteGuestFromTable);

module.exports = router;