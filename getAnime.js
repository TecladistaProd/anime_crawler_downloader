import axios from "axios";
import { JSDOM } from "jsdom";

import getEpisodio from "./getEpisodio";
import inquirer from "inquirer";

async function getAnime(url) {
  const { data } = await axios.get(url);
  const { document } = new JSDOM(data).window;

  const episodios = document.querySelectorAll(
    ".conteudoPost.min-height ul.listaEp li a"
  );

  let episodiosName = [];
  for (let i of episodios) {
    episodiosName.push(i.querySelector("img").title);
  }

  const { episodio } = await inquirer.prompt([
    {
      type: "list",
      name: "episodio",
      message: "Qual Episodio da Lista ?",
      choices: episodiosName
    }
  ]);

  await getEpisodio(episodios[episodiosName.indexOf(episodio)].href, episodio);
}

export default getAnime;
