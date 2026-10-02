import "dotenv/config";
import { app } from "./app.js";
import dbConnect from "./db/index.js";

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting the database:", err);
    process.exit(1);
  });
