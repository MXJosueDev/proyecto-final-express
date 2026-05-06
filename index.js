require("dotenv").config();

const morgan = require("morgan");
const express = require("express");
const app = express();
const employee = require("./routes/employee");
const user = require("./routes/user");
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");
const initDb = require("./config/initDb");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

app.get("/", index);

app.use("/user", user);

app.use(auth);
app.use("/employee", employee);

app.use(notFound);

const port = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running...");
    });
  })
  .catch(error => {
    console.error("DB init failed", error);
    process.exit(1);
  });
