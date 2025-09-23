//1) import express
import express from "express";
//6.2) get the path
import path from "path";
const __dirname = path.resolve();
console.log("&&&&&& pwd:", __dirname);

//10) filesystem -> worker thread (promises, async/await)
import fs from "fs";

//2) define express varible and execute the express
const app = express();
const PORT = 5000;

//7) Serving static file from the public directory (ej: style.css)
//keep all static resources in public folder
app.use(express.static(path.join(__dirname, "/public"))); //-->make changes in index.html--> add <link>

//9) Middleware to receive data-body (post method)
app.use(express.urlencoded({ extended: true }));

//6) Create endpoints: send html file as response: sends index.html
//<------Home page controller-------->
app.get("/", (req, res) => {
  console.log("We received Home");
  res.sendFile(__dirname + "/src/html/index.html");
});

//<------User Registration controller-------->
//can show the page and also receive if the info is sent as "get method"
app.get("/register", (req, res) => {
  console.log("Request QUERY: ", req.query);
  console.log("We received Registration");
  res.sendFile(path.join(__dirname, "/src/html/register.html"));
});

//Post request to receive the data sent by /register, receive data as data-body
const fileName = "userList.csv";
app.post("/register", (req, res) => {
  console.log("Request.Body: ", req.body);
  console.log("Registration completed");

  const { name, email, password } = req.body;
  const str = `${name},${email},${password}`;
  console.log(str);
  console.log(str.split(","));

  //create file and write data
  fs.writeFile(fileName, str, (error) => {
    error ? console.log(error) : "Data has been written in csv file";
  });

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
