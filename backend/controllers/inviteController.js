const crypto = require('crypto');
const Invite = require('../models/Invite');
const Server = require('../models/serverModel');
const User = require('../models/User');
const Message = require('../models/Message');

// Create Invite Link
exports.createInvite = async (req, res) => {
    try {
        const { serverId, inviterId, inviteeEmail } = req.body;

        // console.log(req.body)

        const user = await User.findOne({uid:inviterId})

        const newInvite = new Invite({ serverId, inviterId:user._id, inviteeEmail });
        await newInvite.save();

        const receiver = await User.findOne({email:inviteeEmail});

        const server = await Server.findById(serverId);


        const newMessage = new Message({
              senderId:user.uid,
              receiverId:receiver.uid,
              message:`http://localhost:3000/chat?id=${newInvite._id}&name=${server.name}&serverId=${serverId}`,
              files:[],
              // senderName: sender.fullName,
              // senderAvatar: sender.avatar,
              // receiverName: receiver.fullName,
              // receiverAvatar: receiver.avatar,
            });

        await newMessage.save();
        

        res.status(201).json({ success: true, invite: newInvite });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Join Server Using Invite
exports.joinServer = async (req, res) => {
  try {
    const { token } = req.params;
    const { userId } = req.body;

        console.log(id, status)
        // Validate status
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const invite = await Invite.findByIdAndUpdate(id, { status }, { new: true });

        if (!invite) {
            return res.status(404).json({ success: false, message: 'Invite not found' });
        }

        if (status === 'accepted') {
            const user = await User.findOne({ email: invite.inviteeEmail });
            await Server.findByIdAndUpdate(invite.serverId, { $push: { members: user._id } });
        }

        res.json({ success: true, invite });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

    const server = await Server.findById(invite.serverId);
    if (!server) {
      return res.status(404).json({ success: false, message: 'Server not found' });
    }

    // Check if user already a member
    if (!server.members.includes(userId)) {
      server.members.push(userId);
      await server.save();
    }

    res.status(200).json({ success: true, message: 'Joined server successfully', server });
};
