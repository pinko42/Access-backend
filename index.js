const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Reports = require("./models/Reports");
const Users = require("./models/Users");

var SerialPort = require("serialport");

var arduinoCOMPort = "COM3";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
  baudRate: 9600,
});

arduinoSerialPort.on("open", function () {
  console.log("Serial Port " + arduinoCOMPort + " is opened.");
});
arduinoSerialPort.open(function () {
  arduinoSerialPort.on("data", function (data) {
    console.log(data.toString());
    openDoor(data.toString());
  });
});

const usersRouter = require("./routes/usersRouter");

mongoose.connect("mongodb://localhost/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("db launched successfully");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", usersRouter);

const openDoor = async (code) => {
  try {
    const cardnumber = code;

    const found = await Users.find({ cardnumber: cardnumber }).exec();
    console.log(found);
    const newReport = new Reports();
    newReport.firstname = found[0].firstname;
    newReport.cardnumber = found[0].cardnumber;
    newReport.door = "door 1";
    const result = await newReport.save();
    console.log("hello");
    arduinoSerialPort.write("w");
    console.log("good");
    setInterval(() => {
      arduinoSerialPort.write("f");
    }, 2000);
  } catch (err) {}
};

app.listen(8080, () => {
  console.log("api runing in port 8080");
});
