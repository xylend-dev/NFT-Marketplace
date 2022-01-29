import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import TestWeave from "testweave-sdk";
import arweaveJWKFile from "../assets/keys/arweave-jwk.json";

const environment = process.env.REACT_APP_ENV;

const arweaveOptions = {
  host: process.env.REACT_APP_ARWEAVE_HOST,
  port: Number(process.env.REACT_APP_ARWEAVE_PORT),
  protocol: process.env.REACT_APP_ARWEAVE_PROTOCOL,
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

let arweaveJWK: JWKInterface = arweaveJWKFile;
let testWeave: TestWeave;
if (environment !== "production") {
  (async () => {
    const BLOCK_TIMER = 10000;
    testWeave = await TestWeave.init(arweave);
    arweaveJWK = testWeave.rootJWK;

    setInterval(async () => {
      await testWeave!.mine();
    }, BLOCK_TIMER);
  })();
}

export { arweave, testWeave, arweaveOptions, arweaveJWK, arweaveEndpoint };
