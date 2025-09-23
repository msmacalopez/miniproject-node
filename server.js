//1) import express
import express from "express";
//6.2) get the path
import path from "path";
const __dirname = path.resolve();
console.log("&&&&&& pwd:", __dirname);

//10) filesystem -> worker thread (promises, async/await)
import fs from "fs";
import { makeHTMLstring } from "./src/fileMerger.js";
import { escape } from "querystring";

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
  //read the file
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/src/html/index.html");
    } else {
      console.log(data.split("\n"));
      res.send(makeHTMLstring(data.split("\n")));
    }
  });
  // res.send(makeHTMLstring()); //send string, not a file
  // res.sendFile(__dirname + "/src/html/index.html");
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
  const str = `${name},${email},${password}\n`;
  console.log(str);
  console.log(str.split(","));

  //create file and write data (fs.writeFile)
  fs.appendFile(fileName, str, (error) => {
    error ? res.send(error.message) : res.redirect("/");
    // : res.send(
    //     `<h1 class="alert alert-success">User has been written in csv file, you may log in now</h1>`
    //   );
  });

  // res.sendFile(path.join(__dirname, "/src/html/register.html"));
});

//<------User Login controller-------->
app.get("/login", (req, res) => {
  console.log("We received Login");
  res.sendFile(path.join(__dirname, "/src/html/login.html"));
});

//post request login
app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const str = email + "," + password;

  //read data from file
  fs.readFile(fileName, "utf8", (error, data) => {
    if (error) {
      console.log(error);
      res.send("<h1>There was an error processing your request</h1>");
    } else {
      console.log(data);
      const person = data.split("\n").find((user) => user.includes(str));
      console.log(person);
      person?.length
        ? res.send(`<h1>Hey ${person.split(",")[0]} you have access</h1>`)
        : res.send(`<h1>Invalid loggin details</h1>`);
    }
  });
});

//3) open the port
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running: http://localhost:${PORT}`);
});
