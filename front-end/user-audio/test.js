const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

let data = new FormData();
data.append('device_id', 'PAB-00083912');
data.append('file', fs.createReadStream('../../backend/app/assets/speech_eng_1.mp3'));

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://hackit-api-111308238154.asia-southeast1.run.app/detect',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

console.log('Testing FastAPI endpoint...');
console.log('URL:', config.url);

axios.request(config)
.then((response) => {
  console.log('SUCCESS!');
  console.log(JSON.stringify(response.data, null, 2));
})
.catch((error) => {
  console.log('ERROR:');
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
    console.log('Headers:', error.response.headers);
  } else if (error.request) {
    console.log('No response received:', error.message);
  } else {
    console.log('Error:', error.message);
  }
});
