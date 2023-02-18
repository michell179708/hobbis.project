const express = require("express");
const axios = require("axios");
var cors = require("cors");

const CLIENT_ID = "a8e43663b9a4cbdd645d";
const CLIENT_SECRET = "31188b6fd43fcc6eb8e96a0737ba0a5e3d0d2620";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?a8e43663b9a4cbdd645d=${CLIENT_ID}&31188b6fd43fcc6eb8e96a0737ba0a5e3d0d2620=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    res.redirect(
      `http://localhost:8080?access_token=${response.data.access_token}`
    );
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});