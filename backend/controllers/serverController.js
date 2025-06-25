// controllers/serverController.js

const multer = require("multer");
const path = require("path");
const Server = require("../models/serverModel");
const User = require("../models/User");
const Channel = require("../models/channel");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

exports.createServer = [
  upload.single("file"),
  async (req, res) => {
    try {
      const { name, ownerId, description } = req.body;

      const filename = req.file.filename; // Get the saved filename

      //find user by id
      const user = await User.findOne({uid: ownerId});
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      const newServer = new Server({
        name,
        ownerId: user._id, // Use the user's _id
        description,
        members: [user._id], // Add the user to the members array
        imageUrl: filename,
      });

      await newServer.save();

      res.status(201).json({ success: true, server: newServer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
];

exports.getServers = async (req, res) => {
  try {
    const { id } = req.params;
    const user
      = await User.findOne({ uid: id });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find all servers where the user is a member or the owner
    const servers = await Server.find({
      $or: [
        { ownerId: user._id },
        { members: user._id },
      ],
    })


    res.json({ success: true, servers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteServer = async (req, res) => {
  try {
    const { id } = req.params;
    await Server.findByIdAndDelete(id);

    //also delte channel with this server id
    await Channel.deleteMany({ serverId: id });


    res.json({ success: true, message: "Server deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.editServer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedServer = await Server.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedServer) {
      return res
        .status(404)
        .json({ success: false, message: "Server not found" });
    }
    res.json({ success: true, message: "Server updated", data: updatedServer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

};


exports.getUsers = async (req, res) => {
  try {
    const { id } = req.params;
    //find the server by id and retrun the owner information (name , image ,id) and members information (name , image ,id)
    const server = await Server.findById(id).populate("ownerId", "fullName avatar _id").populate("members", "fullName avatar _id");


    res.json({ success: true, server });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


exports.leaveServer = async (req,res)=>{
  try{
    const {id} = req.params;


    const server = await Server.findById(id);
    if(!server){
      return res.status(404).json({ success: false, message: "Server not found" });
    }

    const uid = req.uid;

    const user = await User.findOne({uid: uid});

    // remove the user from the server members
    server.members = server.members.filter(member => member.toString() !== user._id.toString());
    await server.save();

    res.json({ success: true, message: "User left the server" });
    

  }catch(e){
    res.status(500).json({ success: false, message: e.message });
  }
}

exports.getServerOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const server = await Server.findById(id).populate("ownerId", "fullName avatar _id, uid");
    if (!server) {
      return res.status(404).json({ success: false, message: "Server not found" });
    }
    res.json({ success: true, owner: server.ownerId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
