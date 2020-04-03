import express from "express";
// import proxy from "express-http-proxy";
// import { createProxyMiddleware } from "http-proxy-middleware";

import getAnimes from "./gets/getAnimes";
import getAnime from "./gets/getAnime";
import getVideo from "./gets/getVideo";

const app = express();

// import url from "./url";
// getAnimes(url);

app.get("/", (req, res) => {
  res.send(`
    <h1>Get Animes</h1>
    <form action='animes' method='get'>
      <input placeholder='anime name' name='name'/>
    </form>
  `);
});

app.get("/animes", async (req, res) => {
  const animes = await getAnimes(req.query.name);
  let html = `
  <h1>animes</h1>
  <ul>`;
  animes.forEach(i => (html += `<li>${i}</li>`));
  html += "</ul>";
  res.send(html);
});

app.get("/anime/:base64", async (req, res) => {
  const { base64 } = req.params;

  const episodios = await getAnime(base64);

  let html = `
  <h1>Episódios</h1>
  <ul>`;
  episodios.forEach(i => (html += `<li>${i}</li>`));
  html += "</ul>";
  res.send(html);
});

app.get("/video/:base64", async (req, res, next) => {
  const { base64 } = req.params;
  const { oldUrl } = req.query;

  await getVideo(base64, oldUrl, res);
});

app.listen(3001, () => console.log("Listening on http://173.0.0.1:3001"));
