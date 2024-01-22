const fs = require('fs');
const axios = require('axios');

const API_KEY = 'AIzaSyDyD3Cl845NiAT-lohwsnN_725KC7Q9GAg';
// const fileName = './audio.raw';

// Reads a local audio file and converts it to base64
// const file = fs.readFileSync(fileName);
// const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
// const audio = {
//   content: audioBytes,
// };
// const configWave = {
//   encoding: 'LINEAR16',
//   sampleRateHertz: 16000,
//   languageCode: 'en-US',
// };

const configFLAC  = {
    config: {
    encoding:"FLAC",
    sampleRateHertz: 16000,
    languageCode: "en-US",
    enableWordTimeOffsets: false
    },
    audio: {
        uri:"gs://cloud-samples-tests/speech/brooklyn.flac"
    }
}
//   audio: audio,
//   config: config
const request = {
    config: {
    encoding:"FLAC",
    sampleRateHertz: 16000,
    languageCode: "en-US",
    enableWordTimeOffsets: false
    },
    audio: {
        uri:"gs://cloud-samples-tests/speech/brooklyn.flac"
    }
};

const apiKey = API_KEY;
const url = `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`;

axios.request({
  url,
  method: 'POST',
  data: request
})
.then(response => {
  const transcription = response.data.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
})
.catch(err => {
  console.log('err :', err);
});