const express        = require('express');
const bodyParser     = require('body-parser');
const manateeFacts   = require('./manatee_facts.json');
const manateeImages  = require('./manatee_images.json')
const rp             = require('request-promise-native');

require('dotenv').config();

const port = process.env.PORT;
const api_token = process.env.API_TOKEN;
const channel = process.env.CHANNEL;
const timeBetweenPosts = process.env.MINUTES_BETWEEN_POSTS * 60000;

let factIndex = process.env.STARTING_FACT_INDEX || 0;

const app = express();
app.use(bodyParser.json());

app.post('/slack_webhook', (req, res) => {
  const payload = req.body;
  console.log(req.body);
  if (payload.type === 'url_verification') {
    const challenge = payload.challenge;
    res.send({challenge: challenge});
  } else if(payload.event.type === 'message') {
    res.send(200);
  } else if(payload.event.type === 'app_mention') {
    res.send(200);
    postManateeFact();
  }
});

app.get('/', (req, res) => {
  res.send('Hello there! Nice to meet you.')
});

app.listen(port, () => {
  console.log('We are live on ' + port);
});


async function postManateeFact() {
  const options = {
    method: 'POST',
    url: 'https://slack.com/api/chat.postMessage',
    json: true,
    headers: {
      'Authorization': `Bearer ${api_token}`
    },
    body: {
      channel: channel,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'plain_text',
            text: manateeFacts[factIndex % manateeFacts.length]
          },
          accessory:
            {
              type: 'image',
              image_url: manateeImages[factIndex % manateeImages.length],
              alt_text: manateeImages[factIndex % manateeImages.length]
            }
        }
      ]
    },
  };

  factIndex++;

  const response = await rp(options);
  console.log(response);
}

setInterval(postManateeFact, timeBetweenPosts);

postManateeFact();


