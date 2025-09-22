//1) import express
import express from "express";
//6.2) get the path
import path from "path";
const __dirname = path.resolve();
console.log("&&&&&&", __dirname);

//2) define express varivle and execute the express
const app = express();
const PORT = 5000;

//4) Response String (res.send("string")): handle the request, by default: Get
// app.get("/", (req, res, next) => {
//   console.log("Response sent in 4)");
//   res.send("res.send() send response as string from Server");
// });

//5) Response as HTML String:
// app.get("/", (req, res, next) => {
//   console.log("Response sent in 5)");
//   res.send("<h1>res.send() send response as Html string</h1>");
// });

//6) send html file as response: sends index.html
app.get("/", (req, res) => {
  //6.1) needs absolute path: do PWD
  //   res.sendFile(
  //     "/Users/MacaLopez/Documents/DentedCode/DentedCode - Node/miniProj-Node/src/html/index.html"
  //   );
  //#####################
  //6.2) Concatenate my path with the relative path
  res.sendFile(__dirname + "/src/html/index.html");
});

//3) open the port
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running: http://localhost:${PORT}`);
});
