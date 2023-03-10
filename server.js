// load .env data into process.env
require("dotenv").config();
// const bcrypt = require('bcrypt');

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");

const cookieSession = require('cookie-session');
const bcrypt = require("bcrypt");
var methodOverride = require("method-override");


const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(
  cookieSession({
    name: "session",
    keys: ["maplesyrup", "beaver", "lacrosse"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

const { Pool } = require("pg"); //importing the database connection

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const resourceApiRoutes = require("./routes/resources-api");

const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");

const profileRoutes = require("./routes/profileUpdate");
const loginRoutes = require("./routes/login");
const homeRoutes = require("./routes/home");

const newRoutes = require("./routes/addResource");
const resourceRoutes = require("./routes/resource");
const db = require("./db/connection");

const likesRoutes = require("./routes/likes");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/api/resources", resourceApiRoutes);
app.use("/users", usersRoutes);
app.use("/register", registerRoutes);
app.use("/likes", likesRoutes);
app.use("/profile", profileRoutes);

app.use("/login", loginRoutes);
app.use("/home", homeRoutes);
// http://localhost:8080/login  1. get/    2/ get./test    http://localhost:8080/login/test

app.use("/addResource", newRoutes);




// app.use("/submitRegister", registerPageRoutes);

// app.use("/submitRegister", registPageRoutes);


app.use("/resource", resourceRoutes);



// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).



app.get("/", (req, res) => {
  // const resources = require("./data/resources.json");
  // const comments = require("./data/comments.json");

  // res.render(
  //   "index"
  //   // resources,
  //   // comments,
  // );
  res.redirect("/home");
});



app.get("/:id/likes", (req, res) => {
  res.render("likesPage");
});
// app.get("/register", (req, res) => {
//   res.render("registration");
// });


// app.get("/login", (req, res) => {
//   //established user variable with cookie
//   // if (user) {
//   //   res.redirect('/')
//   //   return;
//   // }
//   res.render("login");
// });


// app.get("/login", (req, res) => {
//   //established user variable with cookie
//   // if (user) {
//   //   res.redirect('/')
//   //   return;
//   // }
//   res.render("login");
// });

app.post("/logout", (req, res) => {
  console.log(`logout request for : ${req.session.user}`);
  setTimeout(()=> req.session = null, 100);
  setTimeout(()=> res.redirect(`/login/`), 300);
});

//set id to cookie

// app.post("/resource"), (req, res) => {
//   let values = [req.body];
//   console.log(req.body);
//   res.send("okay");
// }


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
