import url from "./url";
import getAnimes from "./getAnimes";

import inquirer from "inquirer";

global.inquirer = inquirer;

getAnimes(url);
