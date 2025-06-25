const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http");
const appRouter = require("./routes");
const setupSocket = require("./socket/socketHandler");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const port = 8000;

setupSocket(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Server is running on port 8000');
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.get("/", (req, res) => {
  res.send('Welocome To FreeLance API... :)');
});

// app.post("/api/server/create", (req, res) => {
//   res.json({ message: "Success" });
// });

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", appRouter);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at ${port}`);
});
