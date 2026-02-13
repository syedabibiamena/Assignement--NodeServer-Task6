import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const myfileName = fileURLToPath(import.meta.url);
const mydirName = path.mydirname(myfileName);

const MYPORT = 3000;

function serveFile(res, filePath, type = "text/html", statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Server Error</h1>");
      return;
    }

    res.writeHead(statusCode, { "Content-Type": type });
    res.end(data);
  });
}

const my_server = http.createServer((req, res) => {

  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  let myfilesPath = "";
  let type = "text/html";
  let status = 200;

  switch (req.url) {

    case "/":
    case "/home":
      myfilesPath = path.join(mydirName, "pages/home.html");
      break;

    case "/about":
      myfilesPath = path.join(mydirName, "pages/about.html");
      break;

    case "/contact":
      myfilesPath = path.join(mydirName, "pages/contact.html");
      break;

    case "/styles/style.css":
      myfilesPath = path.join(mydirName, "styles/style.css");
      type = "text/css";
      break;

    default:
      if (req.url.startsWith("/images/")) {
        myfilesPath = path.join(mydirName, req.url);
      } else {
        myfilesPath = path.join(mydirName, "pages/404.html");
        status = 404;
      }
  }

  serveFile(res, myfilesPath, type, status);
});

my_server.listen(MYPORT, () => {
  console.log("Server is up  and running at http://localhost:" + MYPORT);
});
