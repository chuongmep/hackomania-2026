# Personal Alert Button (PAB) System

A simple, accessible emergency alert application designed for the elderly and vulnerable individuals. Features a large, easy-to-press emergency button that records a voice message and sends it to emergency contacts or caregivers.

## Features

- 🚨 **Large Emergency Button** - 260px diameter red SOS button, easy to press
- 👴 **Elderly-Friendly Design** - Large text, high contrast, simple interface
- 📱 **Mobile-first & Accessible** - Optimized for touch interfaces and various abilities
- 💻 **Cross-platform** - Works on smartphones, tablets, and desktop browsers
- 🎤 **Voice Recording** - Captures emergency message with audio
- 🌐 **REST API Integration** - Automatically sends alert to backend
- ✨ **Visual Feedback** - Clear status messages and animations
- 🔄 **Fallback Support** - Sends alert even if microphone is unavailable
- 📍 **Location Ready** - Prepared for geolocation integration

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Modern browser with MediaRecorder API support
- Microphone access permission

## Installation

1. Navigate to the project directory:
```bash
cd front-end/user-audio
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and configure your backend API URL:
```bash
REACT_APP_API_URL=http://localhost:3001/api/audio
```

## Usage

### Development

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory.

## How It Works

1. **Press the large SOS button** to start recording your emergency message
2. **Speak your emergency** - describe your situation
3. **Press again** to stop recording and automatically send alert to caregivers/emergency contacts
4. **Confirmation displayed** - Clear message shows help has been notified

### Alert States

- **Idle** - Ready to send alert (red SOS button)
- **Recording** - Recording emergency message (pulsing red with stop icon)
- **Processing** - Sending alert to emergency contacts (blue button with spinner)
- **Success** - Help notified successfully (green button with confirmation)
- **Error** - Failed to send (orange button - press again to retry)

### Emergency Features

- **Audio Message** - Records your voice describing the emergency
- **Silent Alert** - If microphone unavailable, sends alert without audio
- **Visual Confirmation** - Large, clear messages confirm alert status
- **Location Info** - Ready to include GPS coordinates (requires integration)
- **Multiple Retries** - Automatic fallback if first attempt fails

## API Integration

The app sends emergency alerts to your backend via POST request:

**Endpoint:** Configured in `.env` file  
**Method:** POST  
**Content-Type:** multipart/form-data (with audio) or application/json (silent alert)

### With Audio Recording

**Field name:** audio  
**File format:** audio/webm

### Silent Alert (No Microphone)

**JSON payload:**
```json
{
  "emergency": true,
  "timestamp": "2026-03-07T12:34:56.789Z",
  "type": "silent_alert"
}
```

### Expected Backend API

```javascript
POST /api/audio
Content-Type: multipart/form-data OR application/json

Request body (with audio):
- audio: File (audio/webm format)
- metadata: { timestamp, userId, location }

Request body (silent):
{
  "emergency": true,
  "timestamp": "ISO-8601 timestamp",
  "type": "silent_alert"
}

Response:
{
  "success": true,
  "message": "Emergency alert received",
  "alertId": "unique-id",
  "notifiedContacts": ["contact1", "contact2"]
}
```

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS 14.3+)
- Opera

**Note:** Microphone access requires HTTPS in production (except localhost).

## Mobile Deployment

### Progressive Web App (PWA)

To make this a PWA for better mobile experience:

1. Add a `manifest.json` in the public folder
2. Configure service workers
3. Deploy with HTTPS

### React Native Wrapper

For native mobile apps, consider wrapping with:
- React Native WebView
- Capacitor
- Cordova

## Troubleshooting

### Microphone Permission Denied

- Check browser settings to allow microphone access
- On mobile, check app permissions in device settings
- Ensure you're using HTTPS (required for production)

### Audio Not Sending

- Verify backend API URL in `.env` file
- Check network connectivity
- Verify backend is running and accessible
- Check browser console for errors

### Button Not Responsive on Mobile

- Clear browser cache
- Ensure touch events are not blocked
- Try in different browser

## Customization

### Change Button Color

Edit `src/App.css`:
```css
.record-button {
  background-color: #your-color;
}
```

### Change API Endpoint

Update `.env` file:
```bash
REACT_APP_API_URL=https://your-backend-api.com/api/audio
```

### Modify Recording Format

Edit `src/App.js`:
```javascript
const audioBlob = new Blob(audioChunksRef.current, { 
  type: 'audio/mp4' // or 'audio/wav'
});
```

## Technologies Used

- React 18
- Axios (HTTP client)
- Web Audio API (MediaRecorder)
- CSS3 animations
- Responsive design

## License

See LICENSE file in the root directory.

## Support

For issues and questions, please open an issue in the repository.
