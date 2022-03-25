<p align="center">
  <img src="./app/src/assets/img/logo.svg" alt="SOLRIGAMI" height="150px"/>
</p>

# Solrigami

[![Netlify Status](https://api.netlify.com/api/v1/badges/59548d5f-da99-4bd7-b4df-2f9cf7e0539a/deploy-status)](https://www.solrigami.com/)

Solrigami is an open source web application for creating, viewing and trading digital arts in non-fungible token (NFT) form. The project uses the [Solana](https://solana.com/) and [Arweave](https://www.arweave.org/) blockchain networks to enable low-cost and fast transactions. The application is built based on [Metaplex protocol](https://github.com/metaplex-foundation/metaplex), which guides the standards adopted for handling NFTs.

The application can run completely on-chain just running the front-end inside `app/` folder, but it also supports integration with an API defined in `api/` to allow saving data that does not require to be in blockchain or to fulfill other integration needs.

:warning: This application is free and open source, use and modify it by your own risks.

## Dependencies

Initially, install locally the following dependencies:

1. [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/);
2. [Docker Compose](https://docs.docker.com/compose/install/).

## Configuration files

1. Create `.env` files at `api/` and `app/`;
2. Define the `.env` files with the environment variables as described at `.env-reference`.

## Initialize the project

1. In the main project folder, build and initialize the application with the command:

```bash
sudo docker-compose up --build
```

2. After starting, the application resources will be available in the links below:

- Front-end: `http://localhost:3000/`;
- Back-end: `http://localhost:8000/` (mongoDB on port 27017).

## Contributing

If you would like to make suggestions, report issues or propose changes to the application, please feel free to open an [issue](https://github.com/solrigami/app/issues) or [pull request](https://github.com /solrigami/app/pulls).

## License

The project adopts the license [GNU GPL v3.0](https://www.gnu.org/licenses/gpl-3.0.html).
