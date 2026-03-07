import React, { useState, useRef } from 'react';
import axios from 'axios';
import WaveAnimation from './WaveAnimation';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, processing, success, error
  const [statusMessage, setStatusMessage] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [fullscreenSupported, setFullscreenSupported] = useState(true);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const appRef = useRef(null);
  const holdTimerRef = useRef(null);
  const holdProgressIntervalRef = useRef(null);

  // API endpoint - update this with your backend URL
  const API_ENDPOINT = process.env.REACT_APP_API_URL || 'https://hackit-api-111308238154.asia-southeast1.run.app/detect';
  const DEVICE_ID = process.env.REACT_APP_DEVICE_ID || 'PAB-00083912';

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

  const handleButtonDown = (e) => {
    // Prevent triggering on right-click or disabled state
    if (recordingStatus === 'processing' || isRecording) return;
    
    e.preventDefault();
    setIsHolding(true);
    setHoldProgress(0);
    
    // Start progress animation
    holdProgressIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 2; // 100 / 50 = 2% per interval (5000ms / 100ms intervals)
      });
    }, 100);
    
    // Set timer for 5 seconds
    holdTimerRef.current = setTimeout(() => {
      triggerHotlineCall();
    }, 5000);
  };

  const handleButtonUp = () => {
    if (isHolding && holdProgress < 100) {
      // Released before 5 seconds - trigger normal emergency alert
      clearTimeout(holdTimerRef.current);
      clearInterval(holdProgressIntervalRef.current);
      setIsHolding(false);
      setHoldProgress(0);
      handleButtonPress();
    } else if (holdProgress >= 100) {
      // Already triggered hotline
      clearTimeout(holdTimerRef.current);
      clearInterval(holdProgressIntervalRef.current);
      setIsHolding(false);
      setHoldProgress(0);
    }
  };

  const triggerHotlineCall = () => {
    clearInterval(holdProgressIntervalRef.current);
    setIsHolding(false);
    setHoldProgress(0);
    
    setRecordingStatus('processing');
    setStatusMessage('🔗 Connecting to Emergency Hotline...');
    
    // Simulate hotline connection
    setTimeout(() => {
      setRecordingStatus('success');
      setStatusMessage('📞 Connected! Hotline Support Ready.');
      
      // Simulate call duration then reset
      setTimeout(() => {
        setRecordingStatus('idle');
        setStatusMessage('');
      }, 5000);
    }, 2000);
  };

  const toggleFullscreen = async () => {
    try {
      const elem = appRef.current;
      
      // Check if already in fullscreen
      const isCurrentlyFullscreen = 
        document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement ||
        document.msFullscreenElement;
      
      if (!isCurrentlyFullscreen) {
        // Enter fullscreen - try different methods
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          // Safari
          await elem.webkitRequestFullscreen();
        } else if (elem.webkitEnterFullscreen) {
          // iOS Safari (video element only, but try anyway)
          await elem.webkitEnterFullscreen();
        } else if (elem.mozRequestFullScreen) {
          // Firefox
          await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          // IE11
          await elem.msRequestFullscreen();
        } else {
          // Fallback: Try to hide browser UI on mobile
          if (window.innerHeight < window.outerHeight) {
            window.scrollTo(0, 1);
          }
          console.warn('Fullscreen API not supported on this device');
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          await document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
      // On iOS, fullscreen might not be available, just update state
      setIsFullscreen(!isFullscreen);
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    // Check if fullscreen is supported
    const isSupported = !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
    
    setFullscreenSupported(isSupported);
    
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isNowFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      
      // Cleanup timers on unmount
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (holdProgressIntervalRef.current) clearInterval(holdProgressIntervalRef.current);
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      {fullscreenSupported && (
        <button 
          className="fullscreen-toggle"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          )}
        </button>
      )}
      <div className="container">
        <div className="emergency-badge">🚨 EMERGENCY ALERT</div>
        <h1 className="title">Personal Alert</h1>
        <p className="subtitle">Press button to send emergency message</p>
        
        <div className="button-container">
          <button
            className={`record-button ${isRecording ? 'recording' : ''} ${recordingStatus} ${isHolding ? 'holding' : ''}`}
            onClick={(e) => {
              // Only trigger click if not holding
              if (!isHolding && holdProgress === 0) {
                handleButtonPress();
              }
            }}
            onMouseDown={handleButtonDown}
            onMouseUp={handleButtonUp}
            onMouseLeave={handleButtonUp}
            onTouchStart={handleButtonDown}
            onTouchEnd={handleButtonUp}
            disabled={recordingStatus === 'processing'}
            aria-label="Emergency alert button"
          >
            {/* Hold progress indicator */}
            {isHolding && (
              <div className="hold-progress" style={{
                '--progress': `${holdProgress}%`
              }} />
            )}
            
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
            ? isHolding 
              ? `HOLD ${Math.floor((100 - holdProgress) / 20)}s FOR HOTLINE...`
              : 'PRESS TO ALERT • HOLD 5s FOR HOTLINE'
            : isRecording 
            ? 'RECORDING YOUR MESSAGE...'
            : 'SENDING ALERT...'}
        </div>
        
        {!isRecording && recordingStatus === 'idle' && (
          <div className="hint-text">
            Quick press: Send emergency alert with recording<br />
            Long press (5s): Connect to emergency hotline
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
