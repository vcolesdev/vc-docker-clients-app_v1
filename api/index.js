// @TODO - Integrate TypeScript
import main from "./src/main.js";

async function init() {
  await main();
}

init().catch((err) => {
  console.error(`Error in the init function: ${err}`);
  process.exit(1);
});