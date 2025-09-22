//1) import express
import express from "express";
//6.2) get the path
import path from "path";
const __dirname = path.resolve();
console.log("&&&&&& pwd:", __dirname);

//2) define express varivle and execute the express
const app = express();
const PORT = 5000;

//7) Serving static file from the public directory
//path for static resources (keep inside public folder)
app.use(express.static(path.join(__dirname, "/public"))); //-->go to index.html add <link>

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
