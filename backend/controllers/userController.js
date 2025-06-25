const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const WorkHistory = require("../models/WorkHistory");
const Education = require("../models/Education");
const Project = require("../models/Project");
const Feedback = require("../models/Feedback");
const Review = require("../models/Review");
const nodemailer = require("nodemailer");
const Server = require("../models/serverModel");

require("dotenv").config();

const secretKey = "secret";
const API_URL = process.env.BACKEND_API;

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "freelancing-platform-9043a",
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}
exports.checkUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });

    if (user) {
      res.status(200).json({ exists: true, user });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { uid } = req.params;
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required." });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is hashed or plain
    const isHashed = user.password.startsWith("$2");
    const isMatch = isHashed
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Assign new password (schema will hash it)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      uid,
      fullName,
      email,
      userName,
      profilePicture,
      role,
      provider = "default",
      password,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { uid }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = new User({
      uid,
      fullName,
      email,
      userName,
      role,
      provider,
      password,
      avatar: profilePicture,
    });

    // Save the new user to the database
    await user.save();

    res.status(200).json({ message: "User sign up successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Google/Firebase Authentication
// Updated Google/Firebase Authentication with role handling
exports.googleAuth = async (req, res) => {
  try {
    const { idToken, role } = req.body; // Accept role from frontend

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;
    console.log(decodedToken);
    // Check if user exists in your database
    let user = await User.findOne({ uid });

    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        uid,
        fullName: name,
        email,
        userName: email.split("@")[0], // Generate username from email
        role: role || "client", // Use provided role or default to "client"
        provider: "google",
        avatar: picture,
      });
      await user.save();
    }

    // Generate your own JWT token that includes the role
    const token = jwt.sign(
      {
        userId: user._id,
        uid: user.uid,
        role: user.role,
      },
      secretKey,
      { expiresIn: "48h" }
    );

    res.json({
      message: "Google authentication successful",
      token: token, // Return your JWT token instead of Firebase token
      user: {
        _id: user._id,
        uid: user.uid,
        fullName: user.fullName,
        email: user.email,
        userName: user.userName,
        role: user.role, // Include role in response
        photoURL: user.photoURL,
        provider: user.provider,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

// Regular email/password login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, uid: user.uid }, secretKey, {
      expiresIn: "48h",
    });
    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.sendResetPasswordEmail = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email } = req.body;

  const resetLink = `http://localhost:3000/reset-password?email=${encodeURIComponent(
    email
  )}`;

  const mailOptions = {
    from: "Freelancing Platform Support Team",
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p> <a href="${resetLink}">Reset my password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email.");
    }
    console.log("Email sent:", info.response);
    res.send("Password reset email sent successfully!");
  });
};

exports.FindTalentById = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid })
      .populate("workHistory")
      .populate("education");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getUserFullData = async (req, res) => {
  try {
    const user = await User.findById(req.query.id)
      .populate("workHistory")
      .populate("education");
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format (assuming MongoDB ObjectId)
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const user = await User.findById(userId)
      .populate("workHistory")
      .populate("education")
      .populate("portfolios");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove sensitive information before sending response
    const userResponse = {
      _id: user._id,
      uid: user.uid,
      fullName: user.fullName,
      email: user.email,
      userName: user.userName,
      role: user.role,
      location: user.location,
      description: user.description,
      skills: user.skills,
      hourlyRate: user.hourlyRate,
      avatar: user.avatar,
      linkedInProfile: user.linkedInProfile,
      githubProfile: user.githubProfile,
      behanceProfile: user.behanceProfile,
      workHistory: user.workHistory,
      education: user.education,
      portfolios: user.portfolios,
      provider: user.provider,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    res.status(500).json({ error: "Server error while fetching user data" });
  }
};

exports.updateUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId format
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const {
      fullName,
      location,
      description,
      skills,
      hourlyRate,
      linkedInProfile,
      githubProfile,
      behanceProfile,
      workHistory,
      education,
    } = req.body;

    // Build update object with only provided fields
    const updateFields = {};

    if (fullName !== undefined) updateFields.fullName = fullName;
    if (location !== undefined) updateFields.location = location;
    if (description !== undefined) updateFields.description = description;
    if (hourlyRate !== undefined) updateFields.hourlyRate = hourlyRate;
    if (linkedInProfile !== undefined)
      updateFields.linkedInProfile = linkedInProfile;
    if (githubProfile !== undefined) updateFields.githubProfile = githubProfile;
    if (behanceProfile !== undefined)
      updateFields.behanceProfile = behanceProfile;

    // Handle skills array
    if (skills !== undefined) {
      updateFields.skills = Array.isArray(skills) ? skills : skills.split(",");
    }

    // Handle avatar upload if present
    if (req.files && req.files["avatar"]) {
      updateFields.avatar = `${API_URL}/api/${req.files["avatar"][0].path}`;
    }

    // Handle portfolio updates
    let portfoliosArray = [];
    if (req.files && req.files["portfolios"]) {
      const portfolioTitles = Array.isArray(req.body.portfolioTitles)
        ? req.body.portfolioTitles
        : [];
      const portfolioDescriptions = Array.isArray(
        req.body.portfolioDescriptions
      )
        ? req.body.portfolioDescriptions
        : [];
      const portfolioSkills = Array.isArray(req.body.portfolioSkills)
        ? req.body.portfolioSkills
        : [];

      const portfoliosFiles = req.files["portfolios"];

      portfoliosArray = await Promise.all(
        portfoliosFiles.map(async (file, index) => {
          const portfolio = new Portfolio({
            filePath: file.path,
            title: portfolioTitles[index] || "",
            description: portfolioDescriptions[index] || "",
            portfolioSkills: portfolioSkills[index] || "",
          });
          await portfolio.save();
          return portfolio._id;
        })
      );

      if (portfoliosArray.length > 0) {
        updateFields.portfolios = portfoliosArray;
      }
    }

    // Handle work history updates
    if (workHistory && Array.isArray(workHistory)) {
      const workHistoriesArray = await Promise.all(
        workHistory.map(async (history) => {
          const workHistoryDoc = new WorkHistory({
            company: history.company,
            position: history.position,
          });
          await workHistoryDoc.save();
          return workHistoryDoc._id;
        })
      );

      if (workHistoriesArray.length > 0) {
        updateFields.workHistory = workHistoriesArray;
      }
    }

    // Handle education updates
    if (education && Array.isArray(education)) {
      const educationArray = await Promise.all(
        education.map(async (item) => {
          const educationDoc = new Education({
            degree: item.degree,
            school: item.school,
            year: item.year,
          });
          await educationDoc.save();
          return educationDoc._id;
        })
      );

      if (educationArray.length > 0) {
        updateFields.education = educationArray;
      }
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    })
      .populate("workHistory")
      .populate("education")
      .populate("portfolios");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove sensitive information
    const userResponse = {
      _id: updatedUser._id,
      uid: updatedUser.uid,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      userName: updatedUser.userName,
      role: updatedUser.role,
      location: updatedUser.location,
      description: updatedUser.description,
      skills: updatedUser.skills,
      hourlyRate: updatedUser.hourlyRate,
      avatar: updatedUser.avatar,
      linkedInProfile: updatedUser.linkedInProfile,
      githubProfile: updatedUser.githubProfile,
      behanceProfile: updatedUser.behanceProfile,
      workHistory: updatedUser.workHistory,
      education: updatedUser.education,
      portfolios: updatedUser.portfolios,
      provider: updatedUser.provider,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Error updating user by userId:", error);
    res.status(500).json({ error: "Server error while updating user data" });
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.uid;

    // Handle both Firebase UID and database ID
    const query =
      req.authType === "firebase" ? { uid: userId } : { _id: userId };
    const deletedUser = await User.findOneAndDelete(query);

    if (!deletedUser) {
      return res.status(404).send({ error: "User not found." });
    }

    res.status(200).send({ message: "User profile successfully deleted." });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user profile." });
  }
};

// Rest of your controller methods remain the same...
exports.getBestMatchProjects = async (req, res) => {
  try {
    const userId = req.uid;
    console.log(userId);
    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract query parameters
    let { skills, location, hourlyRate } = req.query;

    // Convert skills into an array if passed
    const skillArray = skills ? skills.split(",") : user.skills;

    // Construct query
    const query = {
      $or: [
        { skills: { $in: skillArray } },
        { location: location || user.location },
        {
          hourlyRate: {
            $lte: hourlyRate ? parseFloat(hourlyRate) : user.hourlyRate,
          },
        },
      ],
    };

    // Fetch projects
    const projects = await Project.find(query).sort({ hourlyRate: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get best match projects." });
  }
};

exports.filterTalents = async (req, res) => {
  try {
    const { skills, minRate, maxRate, locations, types, levels, searchTerm } = req.query;

    console.log("Incoming searchTerm:", searchTerm);

    const query = { role: "freelancer" };

    if (locations && locations.length) {
      const locationArray = locations.split(",");
      query.location = { $in: locationArray };
    }

    if (minRate && maxRate) {
      query.hourlyRate = {
        $gte: Number(minRate),
        $lte: Number(maxRate),
      };
    }

 if (typeof searchTerm === "string" && searchTerm.trim() !== "") {
  const trimmed = searchTerm.trim();

  try {
    const regex = new RegExp(trimmed, "i");

    console.log("Constructed Regex:", regex); // ✅ Log the actual regex

    query.$or = [
      { name: { $regex: regex } },
      { jotTitle: { $regex: regex } },  // ✅ Use `jotTitle` if that's correct
      { skills: { $elemMatch: { $regex: regex } } },
    ];
  } catch (err) {
    console.error("Invalid regex:", err);
  }
}



    console.log("Final MongoDB Query:", JSON.stringify(query, null, 2));

    const users = await User.find(query);

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error filtering talents:", error);
    res.status(500).json({
      error: "Failed to filter projects",
      details: error.message,
    });
  }
};



exports.giveFeedback = async (req, res) => {
  try {
    const userId = req.uid;
    const { targetUserId, projectId, feedback } = req.body;

    const newFeedback = new Feedback({
      project: projectId,
      from: userId,
      to: targetUserId,
      feedback: feedback,
    });

    await newFeedback.save();

    res.status(200).json({ message: "Thank you for your feedback." });
  } catch (error) {
    res.status(500).send({ error: "Failed to give feedback." });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const { id, newFeedback } = req.body;

    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found." });
    }

    const creationDate = feedback.createdAt;
    const currentDate = new Date();

    const timeDifference = currentDate - creationDate;
    const oneMonthMilliseconds = 30 * 24 * 60 * 60 * 1000;

    if (timeDifference > oneMonthMilliseconds) {
      return res.status(403).json({
        error: "You can update feedback only within 1 month of creation.",
      });
    }

    feedback.feedback = newFeedback;
    await feedback.save();

    res.status(200).json({ message: "Updated the feedback successfully." });
  } catch (error) {
    res.status(500).send({ error: "Failed to update the feedback." });
  }
};

exports.setReview = async (req, res) => {
  try {
    const userId = req.uid;
    const {
      projectId,
      targetUserId,
      skills,
      availability,
      communication,
      quality,
      deadlines,
      cooperation,
    } = req.body;

    const newReview = new Review({
      project: projectId,
      from: userId,
      to: targetUserId,
      skills: skills,
      availability: availability,
      communication: communication,
      quality: quality,
      deadlines: deadlines,
      cooperation: cooperation,
    });

    await newReview.save();

    res.status(200).json({
      message: "Set review successfully.",
      meanReview:
        (skills +
          availability +
          communication +
          quality +
          deadlines +
          cooperation) /
        6,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to set review." });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const {
      id,
      skills,
      availability,
      communication,
      quality,
      deadlines,
      cooperation,
    } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }

    const creationDate = review.createdAt;
    const currentDate = new Date();

    const timeDifference = currentDate - creationDate;
    const oneMonthMilliseconds = 30 * 24 * 60 * 60 * 1000;

    if (timeDifference > oneMonthMilliseconds) {
      return res.status(403).json({
        error: "You can update review only within 1 month of creation.",
      });
    }

    review.skills = skills;
    review.availability = availability;
    review.communication = communication;
    review.quality = quality;
    review.deadlines = deadlines;
    review.cooperation = cooperation;

    await review.save();

    res.status(200).json({ message: "Updated the review successfully." });
  } catch (error) {
    res.status(500).send({ error: "Failed to update the review." });
  }
};

exports.getClientHistory = async (req, res) => {
  try {
    const userId = req.uid;

    const projects = await Project.find({
      status: "completed",
      owner: userId,
    }).populate("owner");

    const projectIds = projects.map((project) => project._id);

    const feedbacks = await Feedback.find({ project: { $in: projectIds } });

    const reviews = await Review.find({ project: { $in: projectIds } });

    const projectDetails = projects.map((project) => ({
      ...project.toJSON(),
      feedback: feedbacks.filter((feedback) =>
        feedback.project.equals(project._id)
      ),
      review: reviews.filter((review) => review.project.equals(project._id)),
    }));

    res.status(200).json(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to get history." });
  }
};

exports.getFreelancerHistory = async (req, res) => {
  try {
    const userId = req.uid;

    const projects = await Project.find({
      status: "completed",
      freelancer: userId,
    }).populate("freelancer");

    const projectIds = projects.map((project) => project._id);

    const feedbacks = await Feedback.find({ project: { $in: projectIds } });

    const reviews = await Review.find({ project: { $in: projectIds } });

    const projectDetails = projects.map((project) => ({
      ...project.toJSON(),
      feedback: feedbacks.filter((feedback) =>
        feedback.project.equals(project._id)
      ),
      review: reviews.filter((review) => review.project.equals(project._id)),
    }));

    res.status(200).json(projectDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to get history." });
  }
};



exports.getServerCreatedInvited = async (req, res) => {
  try{
  const uid = req.query.uid; // ✅ Get uid from query params

  console.log("Received uid:", uid);

    if (!uid) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    // Find the user by uid
    const user = await User.findOne({
      uid: uid
    });



    // make two obect one in which we will store the id of user who created the server and one in which we will store the id of user who is invited to the server
    const owner = await Server.find({ ownerId: user._id })
    const member = await Server.find({ members: user._id })

    const servers = {
      owner: owner,
      member: member
    };
    res.json({ success: true, servers });

  }catch(e){
    res.status(500).json({ success: false, message: e.message });
  }

}