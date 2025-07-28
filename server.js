const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

// Set where uploaded files will be stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Save file with original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('GIF Generator backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/upload', upload.single('file'), (req, res) => {
  const captionText = req.body.text;
  const uploadedFile = req.file;

  console.log('Caption:', captionText);
  console.log('File uploaded:', uploadedFile);

  res.send('Upload successful!');
});
