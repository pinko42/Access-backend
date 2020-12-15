const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstname: {
    type: "string",
    required: "firstname is required",
  },
  lastname: {
    type: "string",
    required: "lastname is required",
  },
  cardnumber: {
    type: "string",
    required: "cardnumber is required",
  },
  phone: {
    type: "string",
    required: "phone is required",
  },
  img: {
    type: "string",
    default:
      "https://images.assetsdelivery.com/compings_v2/2nix/2nix1408/2nix140800145.jpg",
  },
  admin: {
    type: "boolean",
    default: false,
  },
});

const Users = mongoose.model("users", UsersSchema);
module.exports = Users;
