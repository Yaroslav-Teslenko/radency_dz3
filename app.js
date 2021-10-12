const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use("/api/", require("./routes/record.routes.js"));
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
