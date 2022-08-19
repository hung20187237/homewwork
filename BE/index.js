const express = require("express");
const app = express();


const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const accountRoute = require('./routes/Accountfb');
const postRoute = require('./routes/post')
const followerRoute = require('./routes/Follower')
const path = require("path");


dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

// const cron = require('cron');
// // const todayReport = require('./excel_report_today');
// var a =0
// var newJob = () => {
//     a += 1;
// }
// var followers_count

// // const getFan = async (e) => {

// //     try {
// //         await axios.get("https://graph.facebook.com/100547109409842", {
// //             params: {
// //                 access_token: accessToken.current.value,
// //                 fields: 'followers_count'
// //             }
// //         })
// //         .then(
// //             res => {
// //                 const result = res.data;
// //                 followers_count = (result.fan_count)
// //             }
// //         )
// //     } catch (err) {}
// // }

// const job = new cron.CronJob({
//   cronTime: '*/3 * * * * *', 
//   onTick: function() {
//     newJob();
//     console.log('Cron jub runing...', a);
//   },
//   start: true, 
//   timeZone: 'Asia/Ho_Chi_Minh' // Lưu ý set lại time zone cho đúng 
// });

// job.start();


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename:  (req, file, cb)=> {
    cb(null, Date.now()+'_' +file.originalname)
  }
});



const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const mutiupload = multer({ storage: storage })
app.post("/api/mutiupload", mutiupload.array("images",12), async (req, res) => {
  try {
    return res.status(200).json({data:"File uploaded successfully",file:req.files});
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(403).json("Too many files to upload.");
    }
    return res.status(500).json(`Error when trying upload many files: ${error}`);
  }
})

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/account", accountRoute);
app.use("/api/post", postRoute);
app.use("/api/follow", followerRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});