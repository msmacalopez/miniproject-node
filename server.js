//1) import express
import express from "express";
//6.2) get the path
import path from "path";
const __dirname = path.resolve();
console.log("&&&&&& pwd:", __dirname);

//2) define express varible and execute the express
const app = express();
const PORT = 5000;

//7) Serving static file from the public directory (ej: style.css)
//keep all static resources in public folder
app.use(express.static(path.join(__dirname, "/public"))); //-->make changes in index.html--> add <link>

//6) Create endpoints: send html file as response: sends index.html
//<------Home page controller-------->
app.get("/", (req, res) => {
  console.log("We received Home");
  res.sendFile(__dirname + "/src/html/index.html");
});

//<------User Registration controller-------->
app.get("/register", (req, res) => {
  console.log("We received Registration");
  res.sendFile(path.join(__dirname, "/src/html/register.html"));
});
//<------User Login controller-------->
app.get("/login", (req, res) => {
  console.log("We received Login");
  res.sendFile(path.join(__dirname, "/src/html/login.html"));
});

//8) send JSON file now
app.get("/api/v1/get-user", (req, res) => {
  res.json({
    fName: "Maca",
    lName: "Lopez",
  });
});

//3) open the port
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running: http://localhost:${PORT}`);
});
