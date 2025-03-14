// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { sendEmail } from "./utils/mail";
import { FormData } from "./types/formTypes";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering page");
  }
});

app.post("/email", async (req, res) => {
  try {
    const formData: FormData = req.body;
    await sendEmail(formData);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
