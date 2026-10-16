import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const isProduction = process.env.NODE_ENV === "production";

const doc = {
  info: {
    title: "Book-Tracker API",
    description: "Book Tracker API documentation",
  },

  host: isProduction ? "book-tracker-yrhf.onrender.com" : "localhost:3030",
  schemes: [isProduction ? "https" : "http"],
};

const outputFile = "./swagger.json";

const routes = ["./routes/bookRoutes.js"];

swagger(outputFile, routes, doc);
