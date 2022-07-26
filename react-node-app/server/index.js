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
  if (err.code === "23505") {
    return res.status(409).json({
      message: "User already exists",
    });
  } else {
    if (err.code === "23502") {
      return res.status(404).json({
        message: "Invalid data",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
