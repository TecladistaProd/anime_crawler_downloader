import axios from "axios";
import { JSDOM } from "jsdom";
import https from "https";

import getEpisodio from "./getEpisodio";

async function getVideo(urlBase, oldURL, res) {
  let buff = new Buffer(urlBase, "base64");
  const url = buff.toString("ascii");
  let { data } = await axios.get(await getEpisodio(url));
  let { document } = new JSDOM(data).window;

  let dt = JSON.parse(
    document
      .querySelector("script:not([src])")
      .innerHTML.replace("var jw = ", "")
  );

  // return dt.file;

  https.get(
    dt.file,
    {
      headers: {
        Referer: oldURL
      }
    },
    function(response) {
      response.pipe(res);
    }
  );
}

export default getVideo;
