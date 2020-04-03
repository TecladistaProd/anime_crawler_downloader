import axios from "axios";
import { JSDOM } from "jsdom";

import getEpisodio from "./getEpisodio";
import inquirer from "inquirer";

import url from "./url";

async function getAnime(anime) {
  let buff = new Buffer(anime, "base64");
  const url = buff.toString("ascii");
  const { data } = await axios.get(url);
  const { document } = new JSDOM(data).window;

  const episodios = document.querySelectorAll(
    ".conteudoPost.min-height ul.listaEp li a"
  );

  let episodiosName = [];
  for (let i of episodios) {
    let buf = Buffer.from(i.href);
    let encodedData = buf.toString("base64");
    episodiosName.push(
      `<a download='${
        i.querySelector("img").title
      }.mp4' href='/video/:${encodedData}?oldUrl=${url}'>${
        i.querySelector("img").title
      }</a>`
    );
  }

  return episodiosName;
}

export default getAnime;
