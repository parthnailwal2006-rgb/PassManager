const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const VaultItemSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    index: true
  },
  
  title: {
    type: String,
    required: true
  },
  
  encryptedPassword: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  authTag:{
    type: String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('VaultItem', VaultItemSchema);