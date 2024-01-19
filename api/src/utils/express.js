import { handleMsgServerListening } from "./messages.js";

/**
 * Listen for requests on a given port and hostname
 * @param port
 * @param hostname
 * @param callback
 */
const listen = (app, port = 8080, hostname = "", callback) => {
  app.listen(port, hostname, () => {
    console.log(handleMsgServerListening(port));
    if (callback) callback();
  });
}

export { listen }