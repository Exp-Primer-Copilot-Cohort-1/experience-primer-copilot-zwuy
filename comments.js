// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// Create web server
const app = express();

// Configure web server
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Create routes
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server error');
        } else {
          res.send(comments);
        }
      });
    }
  });
});

// Start web server
app.listen(3000, () => {
  console.log('Web server running on port 3000');
});