const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema(
  {
    serverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
    inviterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite;
