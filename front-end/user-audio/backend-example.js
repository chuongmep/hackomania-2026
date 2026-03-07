/* Example Backend API Server (Node.js/Express)
 * Save this as server.js in your backend directory
 */

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

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

// Audio upload endpoint - proxies to FastAPI /detect endpoint
app.post('/detect', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No audio file uploaded' 
      });
    }

    const deviceId = req.body.device_id;
    
    if (!deviceId) {
      return res.status(400).json({ 
        success: false, 
        message: 'device_id is required' 
      });
    }

    console.log('Audio file received:', req.file.filename);
    console.log('Device ID:', deviceId);
    console.log('File size:', req.file.size, 'bytes');

    // Forward to FastAPI backend
    const formData = new FormData();
    formData.append('device_id', deviceId);
    formData.append('file', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    console.log('Forwarding to FastAPI...');
    
    const fastApiUrl = 'https://hackit-api-111308238154.asia-southeast1.run.app/detect';
    const response = await axios.post(fastApiUrl, formData, {
      headers: {
        ...formData.getHeaders()
      },
      maxBodyLength: Infinity
    });

    console.log('FastAPI response:', response.data);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Return FastAPI response
    res.json(response.data);
  } catch (error) {
    console.error('Error processing audio:', error.response?.data || error.message);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(error.response?.status || 500).json({ 
      success: false, 
      message: error.response?.data?.detail || 'Error processing audio file',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Audio upload endpoint: http://localhost:${PORT}/detect`);
});

/* 
 * To use this backend:
 * 
 * 1. Install dependencies:
 *    npm init -y
 *    npm install express multer cors axios form-data
 * 
 * 2. Run the server:
 *    node backend-example.js
 * 
 * 3. The API will be available at http://localhost:3001/detect
 * 
 * This server acts as a CORS proxy to the FastAPI backend.
 * Request format:
 *    - device_id: string (device identifier)
 *    - file: audio file (multipart/form-data)
 */
