require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');



const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }


//import routes
const blogRoutes = require('./routes/blog')
const eblogRoutes = require('./routes/eblog')
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const tagRoutes = require('./routes/tag');
const adsRoutes = require('./routes/ads');
const pageRoute = require('./routes/page');
const pollRoute = require('./routes/poll')


//app
const app = express();




//db
mongoose
.connect(process.env.DATABASE)
.then(() => console.log('database connected'));

//middlwares
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(cookieParser());
app.use(express.static("uploads"));

//cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}
app.use(cors(corsOptions));

//routes middleware
app.use('/api', blogRoutes)
app.use('/api', eblogRoutes)
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);
app.use('/api', adsRoutes);
app.use('/api', pageRoute);
app.use('/api', pollRoute);



// const pollData = require("./data.json");
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



//port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

