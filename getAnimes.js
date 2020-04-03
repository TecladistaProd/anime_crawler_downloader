import axios from "axios";
import { JSDOM } from "jsdom";

import getAnime from "./getAnime";

async function getAnimes(url) {
  const { nome } = await inquirer.prompt([
    {
      type: "input",
      name: "nome",
      message: "Nome do Anime:"
    }
  ]);

  const { data } = await axios.get(url.search(nome));
  const { document } = new JSDOM(data).window;

  const animesLink = document.querySelectorAll(
    ".conteudo .pesquisa .animeItem a"
  );
  if (animesLink.length > 2) {
    let animesName = [];
    for (let i of animesLink) {
      animesName.push(i.querySelector(".tituloAnime").innerHTML);
    }
    const { anime } = await inquirer.prompt([
      {
        type: "list",
        name: "anime",
        message: "Qual Anime da Lista ?",
        choices: animesName
      }
    ]);
    await getAnime(animesLink[animesName.indexOf(anime)].href);
  } else if (animesLink.length > 0) {
    await getAnime(animesLink[0].href);
  } else {
    console.log("Anime não encontrado no banco de dados");
  }
}

export default getAnimes;
