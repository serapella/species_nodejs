import express from "express";
import { sendEmail } from "../utils/mail";
import { FormData } from "../types/formTypes";

const router = express.Router();

router.post("/email", async (req: express.Request, res: express.Response) => {
  try {
    const formData: FormData = req.body;

    // Send email
    await sendEmail(formData);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export const emailRouter = router;
