const filename = 'test';
const crypto = require('crypto');
const fs = require('fs');

const hash = crypto.createHash('sha256');

const calculateSHA256 = (fileList) => {
  fileList.forEach((file) => {
    const input = fs.createReadStream(file.path);
    input.on('readable', () => {
      const data = input.read();
      if (data) {
        // console.log(data);
      } else {
        console.log(`${hash.digest('hex')} ${file.name}`);
      }
    });
  });
};

const demoData = [{
  lastModifiedDate: '2018-08-14T19:17:20.617Z',
  name: 'BOSpeechTrimmed.mp3',
  path: '/Users/calinlewis/Desktop/Personal_Projects/Sample Audio/BOSpeechTrimmed.mp3',
  size: 2581355,
  type: 'audio/mp3',
},
{
  lastModifiedDate: '2018-08-14T19:07:27.614Z',
  name: 'barackobamaperupressconferenceARXE.mp3',
  path: '/Users/calinlewis/Desktop/Personal_Projects/Sample Audio/barackobamaperupressconferenceARXE.mp3',
  size: 73221980,
  type: 'audio/mp3',
}];

calculateSHA256(demoData);