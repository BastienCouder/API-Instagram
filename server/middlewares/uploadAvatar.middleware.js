const path = require("path");
const multer = require("multer");
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const uploadsDirectory = path.resolve(
  __dirname,
  "../../client/public/uploads/profil"
);

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const fileName = req.body.name;
    const name = fileName;
    const extension = MIME_TYPES[file.mimetype];
    cb(null, name + "." + extension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (MIME_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("Type de fichier non autorisé."));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5 Mo (en octets)
  },
}).single("avatar");

module.exports = upload;
