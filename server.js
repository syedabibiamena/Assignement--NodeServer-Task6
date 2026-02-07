import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const my_file = fileURLToPath(import.meta.url);
const my_dir = path.dirname(my_file);

const MY_PORT = 3000;


function to_Read_and_Send(res, my_filePath, content_Type, stsCode = 200) {
  fs.readFile(my_filePath, (err, data) => {
    if (err) {
      console.log(err); 
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>Server Error (500)</h1>');
      return;
    }

    res.writeHead(stsCode, { 'Content-Type': content_Type });
    res.end(data);
  });
}

const my_server = http.createServer((req, res) => {

  
  if (req.url === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  let my_filePath = '';
  let content_Type = '';
  let stsCode = 200;

  switch (req.url) {

    case '/':
    case '/home':
      my_filePath = path.join(my_dir, 'pages', 'home.html');
      content_Type = 'text/html';
      break;

    case '/about':
      my_filePath = path.join(my_dir, 'pages', 'about.html');
      content_Type = 'text/html';
      break;

    case '/contact':
      my_filePath = path.join(my_dir, 'pages', 'contact.html');
      content_Type = 'text/html';
      break;

    case '/styles/style.css':
      my_filePath = path.join(my_dir, 'styles', 'style.css');
      content_Type = 'text/css';
      break;

    default:
    
      if (req.url.startsWith('/images/')) {

        my_filePath = path.join(my_dir, req.url);

        const extension = path.extname(my_filePath);

        if (extension === '.png') content_Type = 'image/png';
        else if (extension === '.jpg' || extension === '.jpeg') content_Type = 'image/jpeg';
        else if (extension === '.svg') content_Type = 'image/svg+xml';
        else content_Type = 'application/octet-stream';

      } else {
        
        my_filePath = path.join(my_dir, 'pages', '404.html');
        content_Type = 'text/html';
        stsCode = 404;
      }
  }

  to_Read_and_Send(res, my_filePath, content_Type, stsCode);
});

my_server.listen(MY_PORT, () => {
  console.log(`Server is up and  running at http://localhost:${MY_PORT}`);
});
