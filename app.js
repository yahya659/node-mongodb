const { error } = require("console");
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Custmor = require("./models/CustmorSchema");
var moment = require("moment"); //مكتبه لعلرض الوقت

// .....................................................................................................
app.use(express.static("public")); //يوجد ملف اسمه public
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://devyahya:yahya123123@nodejs.rypt3gz.mongodb.net/?appName=nodejs"
  )
  .then(() => {
    console.log("conected database");
  })
  .catch((error) => {
    console.log("errore conacted", error);
  });

app.listen(port, () => {
  console.log(` ${port}`);
});
// ...................................................................

// Get request
// .......................................................................
app.get("/", (req, res) => {
  Custmor.find()
    .then((result) => {
      res.render("index.ejs", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/add", (req, res) => {
  res.render("user/add.ejs");
});
app.get("/user/:id", (req, res) => {
  //عرض بيانات العميل
  Custmor.findById(req.params.id)
    .then((result) => {
      res.render("user/view.ejs", { obj: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/delete/:id", (req, res) => {
  //حذف عميل
  Custmor.findOneAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// ...................................................................

// Post request
// ......................................................................
app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  Custmor.create(req.body)
    .then(() => {
      console.log("The client has been created");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error in client creation", err);
    });
});
// app.post("/search", (req, res) => {
//   Custmor.find({ firstname: req.body.searchText })
//     .then((result) => {
//       res.render("user/search",{arr:result});
//       // console.log( req.body.searchText)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
app.post("/search", (req, res) => {
  Custmor.find({
    firstname: { $regex: req.body.searchText, $options: "i" }
  })
    .then((result) => {
      res.render("user/search", { arr: result });
    })
    .catch((err) => {
      console.log(err);
    });
});
