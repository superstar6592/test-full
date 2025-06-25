// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

const SECRET_KEY = "secret";

// Initialize Firebase Admin SDK (do this once in your app)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "freelancing-platform-9043a",
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });
}

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    // First, try to verify as Firebase ID token
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.uid = decodedToken.uid;
      req.email = decodedToken.email;
      req.authType = "firebase";
      return next();
    } catch (firebaseError) {}

    // Try to verify as custom JWT token
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.uid = decoded.uid;
      req.authType = "jwt";
      return next();
    } catch (jwtError) {
      console.error("JWT token verification failed:", jwtError);
    }

    // If both fail, return unauthorized
    return res.status(401).json({ message: "Invalid token." });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports = authMiddleware;
