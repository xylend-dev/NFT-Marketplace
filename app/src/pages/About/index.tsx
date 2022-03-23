import React from "react";
import { Grid } from "@mui/material";
import AboutPropertyIcon from "../../assets/img/about-property-icon.svg";
import AboutChainIcon from "../../assets/img/about-chain-icon.svg";
import AboutSellIcon from "../../assets/img/about-sell-icon.svg";
import NFTImage from "../../assets/img/nft-image.png";
import PersonifyImage from "../../assets/img/personify-image.png";
import InevitableImage from "../../assets/img/inevitable-image.png";
import AboutNFTCard from "../../components/AboutNFTCard";
import AboutNFTGradientCard from "../../components/AboutNFTGradientCard";

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

const NFT_REFERENCES = [
  {
    href: "https://ethereum.org/en/nft/",
    image: NFTImage,
    alt: "Imagem representativa da palavra NFT",
    title: "Entenda mais de NFT",
    description:
      "Entenda mais sobre os NFTs e quais os impactos na internet que conhecemos",
  },
  {
    href: "https://www.personifynft.io/",
    image: PersonifyImage,
    alt: "Imagem do colecionável #0178 da coleção personify",
    title: "Personify",
    description:
      "Conheça uma coleção NFT de sucesso construída na rede blockchain Solana",
  },
  {
    href: "https://inevitable.media/blog/",
    image: InevitableImage,
    alt: "Imagem de uma obra abstrata com fluxos de diferentes tintas",
    title: "Inevitable Media",
    description:
      "Mantenha-se atualizado com as últimas notícias e novidades do mercado NFT",
  },
];

export default function About() {
  return (
    <>
      <Grid container spacing={3}>
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
      <Grid container spacing={3}>
        {NFT_REFERENCES.map((nft_info, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <AboutNFTGradientCard
              href={nft_info.href}
              image={nft_info.image}
              description={nft_info.description}
              title={nft_info.title}
              alt={nft_info.alt}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
