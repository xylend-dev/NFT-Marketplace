import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import TestWeave from "testweave-sdk";

const environment = process.env.REACT_APP_ENV;

const arweaveOptions = {
  host: process.env.REACT_APP_ARWEAVE_HOST || "arweave.net",
  port: Number(process.env.REACT_APP_ARWEAVE_PORT || "443"),
  protocol: process.env.REACT_APP_ARWEAVE_PROTOCOL || "https",
  timeout: 20000,
  logging: false,
};

const arweave = Arweave.init(arweaveOptions);

const arweaveEndpoint =
  arweaveOptions.protocol +
  "://" +
  arweaveOptions.host +
  ":" +
  arweaveOptions.port;

const arweaveJWKRaw = process.env.REACT_APP_ARWEAVE_KEY;
let arweaveJWK: JWKInterface = JSON.parse(arweaveJWKRaw || "{}");

let testWeave: TestWeave;
if (environment === "development") {
  (async () => {
    const BLOCK_TIMER = 10000;
    testWeave = await TestWeave.init(arweave);
    arweaveJWK = testWeave.rootJWK;

    setInterval(async () => {
      await testWeave!.mine();
    }, BLOCK_TIMER);
  })();
} else {
  if (Object.keys(arweaveJWK).length === 0) {
    throw Error(
      "Running in homologation/production mode without arweave key configured. Check your .env file."
    );
  }
}

export { arweave, testWeave, arweaveOptions, arweaveJWK, arweaveEndpoint };
