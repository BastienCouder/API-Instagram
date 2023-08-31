import Resizer from "react-image-file-resizer";

export const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
export const clientUrl = import.meta.env.CLIENT_URL;

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const dateParser = (num) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const timestampParser = (num) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const resizeImage = (imageFile, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      imageFile,
      maxWidth,
      maxHeight,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};

export const adjustSquareImages = (imgRef) => {
  if (imgRef.current) {
    const img = imgRef.current;
    if (img.clientHeight !== img.clientWidth) {
      img.classList.add("object-cover", "aspect-w-1", "aspect-h-1");
    } else {
      img.classList.remove("object-cover", "aspect-w-1", "aspect-h-1");
    }
  }
};

export const location = () => {
  window.location = "/profil";
};
