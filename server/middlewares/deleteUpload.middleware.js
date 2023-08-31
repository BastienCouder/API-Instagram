const path = require("path");
const fs = require("fs");

const deleteFile = (fileName) => {
  const filePathToDelete = path.resolve(
    __dirname,
    `../client/public/${fileName}`
  );

  fs.unlink(filePathToDelete, (err) => {
    if (err) {
      console.error(`Erreur lors de la suppression du fichier : ${err}`);
    } else {
      console.log(`Fichier supprimé avec succès : ${filePathToDelete}`);
    }
  });
};

module.exports = deleteFile;
