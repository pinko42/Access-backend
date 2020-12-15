const Users = require("../models/Users");
const Reports = require("../models/Reports");

const addUser = async (req, res) => {
  console.log("hey");
  console.log(req.body);
  try {
    const { firstname, lastname, cardnumber, phone, img, admin } = req.body;

    if (!cardnumber || !firstname || !lastname)
      return res
        .status(400)
        .json({ msg: "information missing plz check request" });
    const newUser = new Users();
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.cardnumber = cardnumber;
    if (phone) newUser.phone = phone;
    if (admin) newUser.admin = admin;
    if (img) newUser.img = img;

    const result = await newUser.save();
    if (!result) return res.status(400).json({ msg: "Bad request" });
    return res.status(201).json({ msg: "added successfully", result });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await Users.find();
    if (!result) return res.status(400).json({ msg: "bad request" });
    return res.status(200).json({ msg: "success", result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "internal server error" });
  }
};

const getReports = async (req, res) => {
    try {
      const result = await Reports.find();
      if (!result) return res.status(400).json({ msg: "bad request" });
      return res.status(200).json({ msg: "success", result });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: "internal server error" });
    }
  };

const newReport = async (req, res) => {
  try {
    const { cardnumber } = req.body;

    if (!cardnumber)
      return res
        .status(400)
        .json({ msg: "information missing plz check request" });

    const found = await Users.find({ cardnumber: cardnumber }).exec();
    console.log(found)
    const newReport = new Reports();
    newReport.firstname = found[0].firstname;
    newReport.cardnumber = found[0].cardnumber;
    newReport.door = "door 1";
    const result = await newReport.save();
    if (!result) return res.status(400).json({ msg: "Bad request" });
    return res.status(201).json({ msg: "added successfully", result });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = { addUser, getUsers, newReport,getReports };
