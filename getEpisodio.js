import axios from "axios";
import { JSDOM } from "jsdom";

import getVideo from "./getVideo";

async function getEpisodio(url, name) {
  let { data } = await axios.get(url);
  let { document } = new JSDOM(data).window;
  await getVideo(
    document.querySelector("#jwplayer noscript iframe").src,
    url,
    name
  );
}

export default getEpisodio;
