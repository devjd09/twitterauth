import {twitterRequestToken, twitterAccessToken} from './utils';

const express = require('express')
const app = express()
const port = 3000

// this will help you generate request token
app.get('/generatetoken', async (req, res) => {
    let data = await twitterRequestToken();
    if (data.requestKey) {
        data = {
            url: `https://api.twitter.com/oauth/authenticate?oauth_token=${data.requestKey}`,
            key: data.requestKey,
            secret: data.requestSecret,
        }
        httpStatus = 200;
    }
    else {
        httpStatus = 400;
        data = {
            status: false,
        }
    }
    // you will need the data.url to redirect user to twitter to authentice the app and redirect back to us.
    return sendJSONResponse(res, httpStatus, data);
  
})

app.post('/loginwithtwitter', async(req, res) => {
    const data = await twitterAccessToken(payload.twitterAuthToken, payload.twitterAuthSecret, payload.twitterOauthVerifier);

    const twitterAccount = await verifyTwitterAccount(data.token, data.secrets);

    const accountInfo = JSON.parse(twitterAccount);

    const twitterPayload = {
        email: accountInfo.email || undefined,
        id: accountInfo.id_str || undefined,
        name: accountInfo.name || undefined,
        platform: 'twitter',
    };
    
    // now you have enough details to call auth service and log user in if all good. 

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})