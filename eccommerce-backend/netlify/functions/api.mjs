import serverless from "serverless-http";
import app from "../../server.mjs"; // Aapki root server.mjs file ka path

export const handler = serverless(app);