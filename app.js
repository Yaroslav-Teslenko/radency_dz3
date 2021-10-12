const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const errorMiddleware = require("./middlewares/error.middleware");
app.use(express.json());
app.use("/api/", require("./routes/record.routes.js"));
app.use(errorMiddleware);
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
