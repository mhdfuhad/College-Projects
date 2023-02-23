const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

//Folder for static resources
app.use(express.static(__dirname + "/public"));

//DOTENV setup
dotenv.config();

// Set up express-fileupload
app.use(fileUpload());

//Handlebars setup
app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    defaultLayout: "main",
  })
);
app.set("view engine", ".hbs");

// Set up express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  //global variable for views to access
  res.locals.user = req.session.user;
  next();
});

//Body Parser setup
app.use(bodyParser.urlencoded({ extended: false }));

//Use controllers
const generalController = require("./controllers/general");
app.use("/", generalController);
const userController = require("./controllers/user");
app.use("/user", userController);
const dashController = require("./controllers/dashboard");
app.use("/dashboard", dashController);
const dataController = require("./controllers/load_data");
app.use("/load-data", dataController);

//Constants
//Bad request response
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

//Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error! Please check console for more information.");
});

//Set port to run on
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

//MongoDB Setup
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Listen on port 8080.
    app.listen(HTTP_PORT, onHttpStart);
  })
  .catch((err) => {
    console.log(err);
  });
