const adsModel = require('../models/adsModel');
const pollModel = require('../models/pollModel');
const multer = require('multer');
const fs = require('fs');




const Storage = multer.diskStorage({
  destination:'uploads',
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});


const pollData = require("../data.json");


exports.pollcreate = (req, res) => {
    if (req.body) {
        fs.writeFileSync("./data.json", JSON.stringify(req.body));
        res.send({
          message: "Data Saved",
        });
      } else {
        res.status(400).send({
          message: "Error No Data",
        });
      }
};

exports.pollread = (req, res) => {
    res.send(pollData);
}


const pollPic = multer({
  storage:Storage
}).single('photo');


exports.pollAdd = (req, res) => {
  pollPic(req, res , (err)=>{
      if(err){
          console.log(err);
      }else{
          const newImage = new pollModel({
              title: req.body.title,
              body: req.body.body,
              option1: req.body,
              option2: req.body,
              option3: req.body,
              photo:{
                  data: fs.readFileSync("uploads/" + req.file.filename),
                  contentType:'image/png'
              }
          })
          const pollsdata = newImage.save()
          .then(()=>res.json(newImage))
          .catch(err => console.log());
      }
  })
};

exports.getPoll =  async (req, res)=>{
  const data = await pollModel.find().sort({createdAt: -1}).limit(1);
  res.json(data);
};







// app.get("/poll", function (req, res) {
//   res.send(pollData);
// });

// app.post("/poll", function (req, res) {  
//     if (req.body) {
//       fs.writeFileSync("data.json", JSON.stringify(req.body));
//       res.send({
//         message: "Data Saved",
//       });
//     } else {
//       res.status(400).send({
//         message: "Error No Data",
//       });
//     }
//   });

