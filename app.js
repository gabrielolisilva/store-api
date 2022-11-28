const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

const productRouter = require("./routes/products");

const connectMB = require("./db/connect");

app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  res.status = 200;
  res.send("Hello world");
});

const start = async () => {
  try {
    await connectMB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`The server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
