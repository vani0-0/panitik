require("dotenv").config();
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const express = require("express");
const path = require("path");


const initializePassport = require("./src/middlewares/passport");
const connectDB = require("./src/database");
const router = require("./src/routes");
const { User } = require("./src/models/user.model");

async function main() {
  const app = express();
  const PORT = process.env.PORT;

  initializePassport(passport, PORT, async (profile) => {
    console.log(profile.sub);
    const user = User.findOne({ email: profile.email });
    return user;
  });

  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/src/views");
  app.set("layout", "layouts/layout");
  app.use(expressLayouts)
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(router);

  app.listen(PORT, async () => {
    const db = await connectDB();
    console.log(`Connected to database: ${db.connections[0].name}`);

    if ((await User.countDocuments()) < 1) {
      await User.create({
        email: "van973vv@gmail.com",
        name: "Shukilap Halupbati",
        role: "ADMIN",
      });
      console.log("--> CREATED ADMIN ACCOUNT <--");
    }

    console.log(`App running on port: http://localhost:${PORT}`);
  });
}

main();
