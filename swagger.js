import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const doc = {
  info: {
    title: "Book-Tracker API",
    description: "Book Tracker API documentation",
  },

  host: "book-tracker-yrhf.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";

const routes = ["./routes/bookRoutes.js", "./routes/reviewRoutes.js"];

swagger(outputFile, routes, doc);
