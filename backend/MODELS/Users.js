const mongoose = require('mongoose');
const {Schema,model}=mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },

  mail:{
    type: String,
    required: true,
  },

  passhash:{
    type: String,
    required:true,
  },
  vaultSalt:{
    type: String,
    required:true,
  },
  wrappedVaultKey: {
    iv: { type: String, required: true },
    authTag: { type: String, required: true },
    encryptedKey: { type: String, required: true }
},
count: {
  type:Number,
  default:0,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = model("Users", UserSchema)

module.exports = UserModel