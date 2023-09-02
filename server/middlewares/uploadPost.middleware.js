const path = require("path");
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const uploadsDirectory = path.resolve(__dirname, "../uploads/post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const extension = MIME_TYPES[file.mimetype];
    if (!extension) {
      return cb(new Error("Type de fichier non autorisé."));
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "post-" + uniqueSuffix + "." + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé."));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // Limite de 5 Mo (en octets)
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
}).single("image");

module.exports = upload;
