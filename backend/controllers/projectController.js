const MileStone = require("../models/MileStone");
const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const SavedProject = require("../models/SavedProject");
const User = require("../models/User");
const OpenAI = require("openai");
const admin = require("firebase-admin");

require("dotenv").config();

const API_URL = process.env.BACKEND_API;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Firebase Admin SDK (if you haven't already)
if (!admin.apps.length) {
  admin.initializeApp();
}

const verifyToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
exports.getProjectsByClientId = async (req, res) => {
  try {
    const uid = req.uid;

    const user = await User.findOne({ uid: uid });

    if (!user) {
      return res.status(400).json({ message: "User can not be found." });
    }

    const projects = await Project.find({ owner: user._id }).populate("owner");

    if (!projects) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.query.projectId;

    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const project = await Project.findById(projectId).populate("owner");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      title,
      owner,
      location,
      description,
      skills,
      type,
      minHourlyRate,
      maxHourlyRate,
      estimatedPrice,
      scope,
      level,
    } = req.body;

    const projectData = {
      owner: owner, // Assuming user._id is available from the authenticated user
      title: title,
      description: description,
      location: location,
      skills: skills,
      scope: scope,
      level: level,
      type: type,
    };

    if (type === "hourly") {
      projectData.minHourlyRate = minHourlyRate;
      projectData.maxHourlyRate = maxHourlyRate;
    } else if (type === "fixed") {
      projectData.estimatedPrice = estimatedPrice;
    }

    const newProject = new Project(projectData);
    await newProject.save();

    res.status(200).json({ message: "Project created successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating a new project.",
      error: error.message,
    });
  }
};

exports.writeProposal = async (req, res) => {
  try {
    const userId = req.uid;
    const user = await User.findOne({ uid: userId });
    const { coverLetter, price, projectId } = req.body;

    const fileUrls =
      req.files && req.files.portfolios && req.files.portfolios.length
        ? req.files.portfolios.map((file) => `${API_URL}/api/${file.path}`)
        : [];

    const proposalData = {
      user: user?._id,
      project: projectId,
      coverLetter: coverLetter,
      price: price,
      portfolios: fileUrls,
    };

    const proposal = new Proposal(proposalData);

    await proposal.save();

    res.status(200).json({ message: "Proposal submitted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while writing a new proposal." });
  }
};

exports.filterProjects = async (req, res) => {
  try {
    const { skills, minRate, maxRate, locations, types, levels, searchTerm } =
      req.query;

    const query = {};

    // 🔍 Title Search
    if (searchTerm && searchTerm.trim() !== "") {
      query.title = { $regex: searchTerm, $options: "i" };
    }

    // 🔍 Skills
    if (skills && skills.length > 0) {
      const skillsArray = skills.split(",");
      query.skills = { $in: skillsArray };
    }

    // 🔍 Levels
    if (levels && levels.length > 0) {
      const levelArray = levels.split(",");
      query.level = { $in: levelArray };
    }

    // 🔍 Payment Types & Rates
    if (types && types.length > 0) {
      const typesArray = types.split(",");
      const typeQueries = [];

      typesArray.forEach((type) => {
        const typeQuery = { type };

        if (type === "hourly") {
          const hourlyQuery = {};
          if (minRate)
            hourlyQuery.minHourlyRate = { $gte: parseFloat(minRate) };
          if (maxRate)
            hourlyQuery.maxHourlyRate = {
              ...hourlyQuery.maxHourlyRate,
              $lte: parseFloat(maxRate),
            };
          Object.assign(typeQuery, hourlyQuery);
        }

        if (type === "fixed") {
          const fixedQuery = {};
          if (minRate)
            fixedQuery.estimatedPrice = { $gte: parseFloat(minRate) };
          if (maxRate) {
            fixedQuery.estimatedPrice = {
              ...fixedQuery.estimatedPrice,
              $lte: parseFloat(maxRate),
            };
          }
          Object.assign(typeQuery, fixedQuery);
        }

        typeQueries.push(typeQuery);
      });

      query.$or = typeQueries;
    }

    if (levels && levels.length > 0) {
      const levelArray = levels.split(",");
      query.level = { $in: levelArray };
    }

    const projects = await Project.find(query).populate("owner");

    const filteredProjects = [];

    projects.map((project) => {
      if (project?.location === "local") {
        if (locations?.length) {
          const locationArray = locations.split(",");
          if (locationArray.includes(project?.owner?.location)) {
            filteredProjects.push(project);
          }
        } else {
          filteredProjects.push(project);
        }
      } else if (project?.location === "worldwide") {
        filteredProjects.push(project);
      }
    });

    res.status(200).json({ projects: filteredProjects });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to filter projects", details: error.message });
  }
};

exports.saveProject = async (req, res) => {
  try {
    const userId = req.uid;
    const { projectId } = req.body;

    const savedProject = new SavedProject({
      freelancer: userId,
      project: projectId,
    });
    await savedProject.save();
    res.status(200).json({ message: "Project saved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to save the project", details: error.message });
  }
};

exports.getSavedProjects = async (req, res) => {
  try {
    const userId = req.uid;

    const savedProjects = await SavedProject.find({ freelancer: userId });

    if (!savedProjects.length) {
      return res
        .status(404)
        .json({ message: "No saved projects found for this user." });
    }

    res.status(200).json(savedProjects);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve saved projects",
      details: error.message,
    });
  }
};

exports.awardProject = async (req, res) => {
  try {
    const { freelancerId, projectId } = req.body;

    await Project.findByIdAndUpdate(
      projectId,
      { freelancer: freelancerId, status: "awarded" },
      { new: true }
    );

    res.status(200).json({ message: "Project award request sent." });
  } catch (error) {
    res.status(500).json({ error: "Failed to award the project." });
  }
};

exports.acceptProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    await Project.findByIdAndUpdate(
      projectId,
      { status: "accepted" },
      { new: true }
    );

    res.status(200).json({ message: "Freelancer accepted the prpject." });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept the project." });
  }
};

exports.rejectProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    await Project.findByIdAndUpdate(
      projectId,
      { freelancer: null, status: "progress" },
      { new: true }
    );

    res.status(200).json({ message: "Freelancer rejected the prpject." });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject the project." });
  }
};

exports.completeProject = async (req, res) => {
  try {
    const { projectId } = req.body;

    await Project.findByIdAndUpdate(
      projectId,
      { status: "completed" },
      { new: true }
    );

    res.status(200).json({ message: "Client ended the prpject." });
  } catch (error) {
    res.status(500).json({ error: "Failed to end the project." });
  }
};

exports.createMileStone = async (req, res) => {
  try {
    const { projectId, freelancerId, amount } = req.body;

    const newMileStone = new MileStone({
      project: projectId,
      freelancer: freelancerId,
      amount: amount,
      status: "progress",
    });

    await newMileStone.save();

    res.status(200).json({ message: "New milesonte created successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a milestone." });
  }
};

exports.getAllProposalsForProject = async (req, res) => {
  try {
    const projectId = req.query.projectId;

    await Proposal.find({ project: projectId })
      .populate("project")
      .populate("user")
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a milestone." });
  }
};

exports.generateDescription = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await openai.chat.completions.create(requestData);
    res.status(200).json({ description: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
};
