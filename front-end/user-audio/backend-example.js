/* Example Backend API Server (Node.js/Express)
 * Save this as server.js in your backend directory
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'audio-' + uniqueSuffix + '.webm');
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Audio upload endpoint
app.post('/api/audio', upload.single('audio'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No audio file uploaded' 
      });
    }

    console.log('Audio file received:', req.file.filename);
    console.log('File size:', req.file.size, 'bytes');

    // Here you can add your custom processing logic:
    // - Convert audio format
    // - Save to database
    // - Upload to cloud storage
    // - Process with speech-to-text API
    // etc.

    res.json({
      success: true,
      message: 'Audio received successfully',
      data: {
        filename: req.file.filename,
        size: req.file.size,
        path: req.file.path
      }
    });
  } catch (error) {
    console.error('Error processing audio:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing audio file' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Audio upload endpoint: http://localhost:${PORT}/api/audio`);
});

/* 
 * To use this backend:
 * 
 * 1. Install dependencies:
 *    npm init -y
 *    npm install express multer cors
 * 
 * 2. Run the server:
 *    node server.js
 * 
 * 3. The API will be available at http://localhost:3001/api/audio
 */
