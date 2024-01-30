const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Instagram",
      version: "1.0.0",
      description: "API d'Instagram",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          googleId: {
            type: "string",
            description: "Identifiant Google de l’utilisateur",
          },
          pseudo: { type: "string", description: "Pseudo de l’utilisateur" },
          pseudoChanged: {
            type: "boolean",
            description: "Indique si le pseudo a été changé",
          },
          email: { type: "string", description: "Email de l’utilisateur" },
          password: {
            type: "string",
            description: "Mot de passe de l’utilisateur",
          },
          picture: {
            type: "string",
            description: "Chemin vers l’image de profil",
          },
          bio: { type: "string", description: "Biographie de l’utilisateur" },
          followers: {
            type: "array",
            items: { type: "string" },
          },
          following: {
            type: "array",
            items: { type: "string" },
          },
          likedPosts: {
            type: "array",
            items: { type: "string" },
          },
          likedComments: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      Post: {
        type: "object",
        properties: {
          posterId: {
            type: "string",
            description: "Identifiant de l’utilisateur qui a créé le post",
          },
          message: {
            type: "string",
            description: "Message du post",
          },
          picture: {
            type: "string",
            description: "Chemin de l’image du post",
          },
          video: {
            type: "string",
            description: "Chemin de la vidéo du post",
          },
          likers: {
            type: "array",
            items: {
              type: "string",
            },
          },
          comments: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Comment",
            },
          },
        },
      },
      Comment: {
        type: "object",
        properties: {
          commenterId: { type: "string" },
          commenterPseudo: { type: "string" },
          text: { type: "string" },
          likers: {
            type: "array",
            items: { type: "string" },
          },
          timestamp: { type: "number" },
          replies: {
            type: "array",
            items: { $ref: "#/components/schemas/Reply" },
          },
        },
      },
      Reply: {
        type: "object",
        properties: {
          replierId: { type: "string" },
          replierPseudo: { type: "string" },
          text: { type: "string" },
          timestamp: { type: "number" },
        },
      },
      Message: {
        type: "object",
        properties: {
          sender: {
            type: "string",
            description: "Identifiant de l’expéditeur du message",
          },
          receiver: {
            type: "string",
            description: "Identifiant du destinataire du message",
          },
          message: { type: "string", description: "Contenu du message" },
          edited: {
            type: "boolean",
            description: "Indique si le message a été édité",
          },
          picture: {
            type: "string",
            description: "Chemin vers l’image dans le message",
          },
          video: {
            type: "string",
            description: "Chemin vers la vidéo dans le message",
          },
          liker: {
            type: "string",
            description: "Identifiant de l’utilisateur qui aime le message",
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
