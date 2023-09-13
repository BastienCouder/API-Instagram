const path = require("path");
const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/svg+xml": "svg",
  "image/webp": "webp",
};

const uploadsDirectory = path.resolve(
  __dirname,
  "../../client/public/uploads/message"
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = MIME_TYPES[file.mimetype];
    cb(null, "message-" + uniqueSuffix + "." + extension);
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
}).single("image");

module.exports = upload;
