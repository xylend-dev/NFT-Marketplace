const SOLRIGAMI_STORE = process.env.REACT_APP_SOLRIGAMI_STORE;

const NO_STORE_MESSAGE =
  "Chave pública do mercado de NFT em blockchain não encontrado";

const validatehasSolrigamiStore = () => {
  if (!SOLRIGAMI_STORE) {
    throw new Error(NO_STORE_MESSAGE);
  }
};

if (!SOLRIGAMI_STORE) {
  console.log(NO_STORE_MESSAGE);
}

export { SOLRIGAMI_STORE, validatehasSolrigamiStore };
