const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/User");
const seeder = require("../data/seeder");

let installerDir = `${process.cwd()}/views/setup`;
// const setupFile = `${installerDir}/setup.ejs`;
const dbFile = `${installerDir}/database.ejs`;
const adminFile = `${installerDir}/admin.ejs`;

router.get("/setup", (req, res) => {
  res.render("setup/setup");
});

router.get("/setup/database", (req, res) => {
  res.render("setup/database");
});

router.post("/setup/database", (req, res) => {
  if (fs.existsSync(dbFile)) {
    if (req.body.database) {
      mongoose.connect(req.body.database, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
          console.log("err")
        }
        else {
          console.log("connected to database");
          fs.writeFileSync(path.resolve(process.cwd(), ".env"), `MONGODB_URI=${req.body.database}`, (err) => {
            if (err) {
              throw err;
            }
            console.log("File is updated.");
            res.redirect("/setup/admin");
          });
        }
      });
    }
    else {
      res.redirect("back");
    }
  }
  else {
    console.log("File system error!");
  }
});

router.get("/setup/admin", (req, res) => {
  res.render("setup/admin");
});

router.post("/setup/admin", (req, res) => {
  if (fs.existsSync(adminFile)) {
    if (req.body.username) {
      let newUser = {
        info: {
          username: req.body.username,
          name: req.body.name,
          role: 'Admin'
        },
        password: req.body.password,
      };

      User.register(newUser.info, newUser.password, (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("back");
        }
        else {
          res.redirect("/setup/populate-vendors");
        }
      });
    }
    else {
      res.redirect("back");
    }
  }
  else {
    console.log("File system error!");
  }
});

router.get("/setup/populate-vendors", (req, res) => {
  res.render("setup/populate-vendors");
});

router.post("/setup/populate-vendors", (req, res) => {
  if (req.body.answer === "Yes") {
    seeder.vendors();
    res.redirect("/setup/populate-products");
  }
  else {
    fs.rmdir(installerDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`installer is deleted!`);
      
    });
    res.redirect("/");
  }
});

router.get("/setup/populate-products", (req, res) => {
  res.render("setup/populate-products");
});

router.post("/setup/populate-products", (req, res) => {
  if (req.body.answer === "Yes") {
    seeder.products();
    res.redirect("/setup/populate-customers");
  }
  else {
    fs.rmdir(installerDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`installer is deleted!`);
      
    });
    res.redirect("/");
  }
});

router.get("/setup/populate-customers", (req, res) => {
  res.render("setup/populate-customers");
});

router.post("/setup/populate-customers", (req, res) => {
  if (req.body.answer === "Yes") {
    seeder.customers();
    res.redirect("/setup/populate-drivers");
  }
  else {
    fs.rmdir(installerDir, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`installer is deleted!`);
      
    });
    res.redirect("/");
  }
});

router.get("/setup/populate-drivers", (req, res) => {
  res.render("setup/populate-drivers");
});

router.post("/setup/populate-drivers", (req, res) => {
  if (req.body.answer === "Yes") {
    seeder.drivers();
  }
  fs.rmdir(installerDir, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }

    console.log(`installer is deleted!`);
    
  });
  res.redirect("/");
});

module.exports = router;