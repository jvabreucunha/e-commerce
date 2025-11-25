const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/veiculos");
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, name)
    }
})

const upload = multer({
    storage,
    limits: { files: 5 },
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith("image")) cb(null, true)
        else cb(new Error("Apenas imagens são permitidas!"))
    }
})

module.exports = upload