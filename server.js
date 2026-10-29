import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./modules/connection.js";
import routes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
import passport from "passport";
import { sessionMiddleware } from "./config/session.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

// Trust Render's reverse proxy in production
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(express.json());
//configure middleware for Seesions
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);
app.use("/", reviewRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send("Book Tracker API is running!");
});

async function startServer() {
  try {
    await connectToMongoDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
