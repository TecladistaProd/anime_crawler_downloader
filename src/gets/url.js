export default {
  /** @type {string} - url of anime website */
  url: "https://animesonline.games",
  /**
   * @function search
   * @param {string} search_param - An Anime Name
   */
  search(search_param) {
    return `${this.url}/?s=${search_param.replace(/\s/g, "+")}`;
  }
};
