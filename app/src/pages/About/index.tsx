import React from "react";
import { Grid } from "@mui/material";
import AboutPropertyIcon from "../../assets/img/about-property-icon.svg";
import AboutChainIcon from "../../assets/img/about-chain-icon.svg";
import AboutSellIcon from "../../assets/img/about-sell-icon.svg";

import AboutNFTCard from "../../components/AboutNFTCard";

const NFT_INFOS = [
  {
    icon: AboutPropertyIcon,
    alt: "Ícone da característica propriedade do NFT",
    title: "Propriedade",
    description:
      "Uma vez registrado um NFT, é quase impossível manipular os dados para roubar a propriedade do ativo devido ao uso da tecnologia blockchain, o que viabiliza a comprovação de validade e posse de um ativo.",
  },
  {
    icon: AboutChainIcon,
    alt: "Ícone da característica proveniência do NFT",
    title: "Proveniência",
    description:
      "As operações de criação ou transferência de um NFT são registradas na blockchain, o que torna possível visualizar a proveniência do ativo, fator importante para as artes digitais, por exemplo.",
  },
  {
    icon: AboutSellIcon,
    alt: "Ícone da característica comerciabilidade do NFT",
    title: "Comerciabilidade",
    description:
      "Um NFT é a representação de um ativo único em ambiente virtual. Logo, através dos contratos inteligentes, é possível comprar ou vender esses bens de forma automatizada e sem intermediários.",
  },
];

export default function About() {
  return (
    <Grid container spacing={3} sx={{ margin: "auto" }}>
      {NFT_INFOS.map((nft_info, index) => (
        <Grid key={index} item xs={12} sm={6} md={4}>
          <AboutNFTCard
            icon={nft_info.icon}
            description={nft_info.description}
            title={nft_info.title}
            alt={nft_info.alt}
          />
        </Grid>
      ))}
    </Grid>
  );
}
