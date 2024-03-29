const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const passport = require("passport");
const passportStrategy = require("./config/passport");
const crypto = require("crypto");
const MongoDBStore = require("connect-mongodb-session")(session);
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");

const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

const secretKey = crypto.randomBytes(32).toString("hex");

// Connexion à la DB
connectDB();

const app = express();
const server = http.createServer(app);

let store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

// Route pour la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.set("trust proxy", 1);

app.use(
  session({
    name: "MyCookie",
    secret: secretKey,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: process.env.COOKIE_CLIENT_URL,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
      httpOnly: false,
      path: "/",
      sameSite: "none",
    },
  })
);

store.on("error", function (error) {
  console.log(error);
});

app.get("/", function (req, res) {
  res.send("/api-docs pour acceder à la documentation");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet()); // Activation des en-têtes de sécurité
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);

// Cors
const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.GOOGLE_URL],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// Routes
app.use("/post", require("./routes/post.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/message", require("./routes/message.routes"));

// JWT middleware
app.use(checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Server Message
io.on("connection", (socket) => {
  console.log("Nouvelle connexion établie avec le client:", socket.id);

  socket.on("newMessage", (data) => {
    console.log("Nouveau message reçu:", data);
    io.emit("messageReceived", data);
  });
});

// Launch the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Le serveur a démarré au port " + PORT));
