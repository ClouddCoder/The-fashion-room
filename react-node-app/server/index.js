const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/users.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use((err, req, res, next) => {
  res.send({ message: err.message });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});