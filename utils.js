const authConsumer = new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    `${process.env.TWITTER_API_KEY}`,
    `${process.env.TWITTER_API_SECRET}`,
    '1.0A',
    `${process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080/account/login' : 'https://mealnight.com/account/login'}`,
    'HMAC-SHA1'
);

module.exports.twitterRequestToken = (authToken, authSecret, oauthVerifier) => {
    return new Promise((resolve, reject) => {
        authConsumer.getOAuthRequestToken((err, oauthToken, authTokenSecret, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ requestKey: oauthToken, requestSecret: authTokenSecret, results });
            }
        })
    })
}

module.exports.twitterAccessToken = (authToken, authSecret, oauthVerifier) => {
    return new Promise((resolve, reject) => {
        authConsumer.getOAuthAccessToken(authToken, authSecret, oauthVerifier, (err, token, secrets, results) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ token, secrets });
            }
        })
    })
}

