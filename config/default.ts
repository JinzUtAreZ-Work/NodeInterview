export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "30m",
  refreshTokenTtl: "1y",
  accessTokenPrivateKey: ``,
  accessTokenPublicKey: ``,
  refreshTokenPrivateKey: ``,
  refreshTokenPublicKey: ``,
  allowedOrigins: [
    "https://www.yoursite.com",
    "http://127.0.0.1:5500",
    "http://localhost:1337",
    "http://localhost:3000",
    "https://www.google.com",
  ],
};
