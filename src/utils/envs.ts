import "dotenv/config";

const { GMAIL_USER, GMAIL_PASS, FRONTEND_URL } = process.env;

if (!GMAIL_USER || !GMAIL_PASS) {
  throw new Error("Gmail credentials are required");
}

export { GMAIL_USER, GMAIL_PASS, FRONTEND_URL };
