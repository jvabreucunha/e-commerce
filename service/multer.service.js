const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/veiculos");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // pega .jpg / .png
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Apenas imagens JPG, PNG ou WEBP são permitidas!"));
  },
});

module.exports = upload;
