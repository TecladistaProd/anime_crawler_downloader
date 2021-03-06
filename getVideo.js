import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";
import https from "https";

async function getVideo(url, oldURL, name) {
  let { data } = await axios.get(url);
  let { document } = new JSDOM(data).window;

  let dt = JSON.parse(
    document
      .querySelector("script:not([src])")
      .innerHTML.replace("var jw = ", "")
  );

  const file = fs.createWriteStream(`${name}.mp4`);
  const request = https.get(
    dt.file,
    {
      headers: {
        Referer: oldURL
      }
    },
    function(response) {
      response.pipe(file);
    }
  );
}

export default getVideo;
