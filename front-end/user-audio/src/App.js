import React, { useState, useRef } from 'react';
import axios from 'axios';
import WaveAnimation from './WaveAnimation';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, processing, success, error
  const [statusMessage, setStatusMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // API endpoint - update this with your backend URL
  const API_ENDPOINT = process.env.REACT_APP_API_URL || 'https://hackit-api-111308238154.asia-southeast1.run.app/detect';
  const DEVICE_ID = process.env.REACT_APP_DEVICE_ID || 'Q2h4VnBzTjRk44444555';

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create MediaRecorder instance with audio/webm codec
      const options = { mimeType: 'audio/webm' };
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Create audio blob from recorded chunks
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        // Send to backend
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStatus('recording');
      setStatusMessage('🔴 Recording emergency message...');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setRecordingStatus('error');
      setStatusMessage('Cannot access microphone. Alert sent without voice.');
      // Even without mic, we should send an alert
      sendEmergencyAlert();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('processing');
      setStatusMessage('Sending emergency alert...');
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('device_id', DEVICE_ID);
      
      // Create a file with proper name and type
      const timestamp = Date.now();
      const audioFile = new File([audioBlob], `recording-${timestamp}.webm`, { 
        type: 'audio/webm',
        lastModified: timestamp
      });
      
      formData.append('file', audioFile);

      console.log('Sending audio to backend...', {
        endpoint: API_ENDPOINT,
        device_id: DEVICE_ID,
        fileSize: audioBlob.size,
        fileType: audioBlob.type
      });

      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);
      setRecordingStatus('success');
      setStatusMessage('HELP NOTIFIED! They are on their way.');
      
      // Reset to idle after 4 seconds
      setTimeout(() => {
        setRecordingStatus('idle');
        setStatusMessage('');
      }, 4000);
    } catch (error) {
      console.error('Error uploading audio:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setRecordingStatus('error');
      setStatusMessage('Alert failed. Press button again.');
      
      // Reset to idle after 4 seconds
      setTimeout(() => {
        setRecordingStatus('idle');
        setStatusMessage('');
      }, 4000);
    }
  };

  const sendEmergencyAlert = async () => {
    // Send emergency alert without audio
    try {
      setRecordingStatus('processing');
      setStatusMessage('Sending emergency alert...');
      
      const response = await axios.post(API_ENDPOINT, {
        device_id: DEVICE_ID,
        emergency: true,
        timestamp: new Date().toISOString(),
        type: 'silent_alert'
      });

      console.log('Emergency alert sent:', response.data);
      setRecordingStatus('success');
      setStatusMessage('HELP NOTIFIED! They are on their way.');
      
      setTimeout(() => {
        setRecordingStatus('idle');
        setStatusMessage('');
      }, 4000);
    } catch (error) {
      console.error('Error sending emergency alert:', error);
      setRecordingStatus('error');
      setStatusMessage('Alert failed. Press button again.');
      
      setTimeout(() => {
        setRecordingStatus('idle');
        setStatusMessage('');
      }, 4000);
    }
  };

  const handleButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="emergency-badge">🚨 EMERGENCY ALERT</div>
        <h1 className="title">Personal Alert</h1>
        <p className="subtitle">Press button to send emergency message</p>
        
        <div className="button-container">
          <button
            className={`record-button ${isRecording ? 'recording' : ''} ${recordingStatus}`}
            onClick={handleButtonPress}
            disabled={recordingStatus === 'processing'}
            aria-label="Emergency alert button"
          >
            <div className="button-inner">
              {recordingStatus === 'processing' ? (
                <div className="spinner" />
              ) : isRecording ? (
                <div className="stop-icon" />
              ) : (
                <div className="emergency-icon">
                  <div className="sos-text">SOS</div>
                </div>
              )}
            </div>
          </button>
        </div>

        {isRecording && (
          <div className="wave-wrapper">
            <WaveAnimation />
          </div>
        )}

        {statusMessage && (
          <div className={`status-message ${recordingStatus}`}>
            {recordingStatus === 'success' && '✓ '}
            {recordingStatus === 'error' && '⚠ '}
            {statusMessage}
          </div>
        )}

        <div className="instructions">
          {!isRecording && recordingStatus !== 'processing' 
            ? 'PRESS TO ALERT HELP' 
            : isRecording 
            ? 'RECORDING YOUR MESSAGE...'
            : 'SENDING ALERT...'}
        </div>
      </div>
    </div>
  );
}

export default App;
