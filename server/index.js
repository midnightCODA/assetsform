import express from "express";
import mysql from "mysql";
import cors from "cors"

const port = 4500 || process.env.PORT
const app = express();

app.use(express.json());
// what does cors do..!!?
app.use(cors());



// const db = mysql.createConnection({
//     host:"sql7.freesqldatabase.com",
//     user:"sql7605833",
//     password:"6Yizp2qDJJ",
//     database:"sql7605833",
//     port:"3306"
// })



const pool = mysql.createPool({
    host:"sql9.freesqldatabase.com",
    user:"sql9607753",
    password:"cbq1f8kkB9",
    database:"sql9607753",
    port:"3306",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to database:', err.stack);
      return;
    }
    console.log('Connected to database as thread ID:', connection.threadId);
    connection.release();
  });
  
//   module.exports = pool;






// middlewares
app.use(express.json())


app.get("/", (req, res)=>{
    res.send("accessed the back end, via more query modifications");
})

// update the database
app.post("/Items", (req, res) => {
    const q = "INSERT INTO `allitems` (`ID`, `location`, `Owner`, `Device`, `Manufacturer`, `Model`, `OSrunning`, `SerialNumber`, `TAGNumber`, `Comments`) VALUES (?)"
    const values = [
        null,
        req.body.location,
        req.body.Owner,
        req.body.Device,
        req.body.Manufacturer,
        req.body.Model,
        req.body.OSrunning,
        req.body.SerialNumber,
        req.body.TAGNumber,
        req.body.Comments
    ]
    pool.query(q, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json("Item has been created successfully")
    })
 })













// listen to port

app.listen(port, ()=> {
    console.log(`connected to the backend at port ${port}, and ready to retrive some data`)
}) 