import axios from "axios";
import { JSDOM } from "jsdom";

import url from "./url";

async function getAnimes(nome) {
  const { data } = await axios.get(url.search(nome));
  const { document } = new JSDOM(data).window;

  const animesLink = document.querySelectorAll(
    ".conteudo .pesquisa .animeItem a"
  );
  let animesName = [];
  for (let i of animesLink) {
    let buf = Buffer.from(i.href);
    let encodedData = buf.toString("base64");
    animesName.push(
      `<a href="/anime/${encodedData}">${
        i.querySelector(".tituloAnime").innerHTML
      }</a>`
    );
  }

  return animesName;
}

export default getAnimes;
