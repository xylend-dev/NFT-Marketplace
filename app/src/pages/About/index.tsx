import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import AboutExplainNFT from "../../assets/img/about-explain-nft.svg";
import AboutSolrigamiIcons from "../../assets/img/about-solrigami-icons.svg";
import AboutPropertyIcon from "../../assets/img/about-property-icon.svg";
import AboutChainIcon from "../../assets/img/about-chain-icon.svg";
import AboutSellIcon from "../../assets/img/about-sell-icon.svg";
import AboutApplicationWalletIcon from "../../assets/img/about-application-wallet-icon.svg";
import AboutApplicationMintIcon from "../../assets/img/about-application-mint-icon.svg";
import AboutApplicationSellIcon from "../../assets/img/about-application-sell-icon.svg";
import NFTImage from "../../assets/img/nft-image.png";
import PersonifyImage from "../../assets/img/personify-image.png";
import InevitableImage from "../../assets/img/inevitable-image.png";
import AboutNFTCard from "../../components/AboutNFTCard";
import AboutNFTGradientCard from "../../components/AboutNFTGradientCard";
import AboutApplicationCard from "../../components/AboutApplicationCard";
import Title from "../../components/Title";

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
    alt: "Ícone da característica de comercialização de NFT",
    title: "Comércio",
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
      "Mantenha-se atualizado com as últimas notícias e novidades do mercado de NFTs",
  },
];

const SOLRIGAMI_WALKTHROUGH = [
  {
    href: "https://phantom.app/",
    buttonLabel: "Criar carteira",
    icon: AboutApplicationWalletIcon,
    alt: "Ícone de carteira de criptoativos",
    title: "Crie uma carteira",
    description:
      "Para começar a utilizar a plataforma, crie uma carteira digital para custodiar os seus criptoativos",
  },
  {
    href: "/create",
    buttonLabel: "Criar NFT",
    icon: AboutApplicationMintIcon,
    alt: "Ícone com um sinal de mais de criação de NFT",
    title: "Crie um NFT",
    description:
      "Utilize a moeda SOL da sua carteira de criptoativos para criar um novo NFT na plataforma Solrigami",
  },
  {
    href: "/",
    buttonLabel: "Marketplace",
    icon: AboutApplicationSellIcon,
    alt: "Ícone com a representação de uma venda",
    title: "Compre e venda NFT",
    description:
      "Compre e venda artes digitais na forma de NFT de artista do mundo inteiro sem taxas de terceiros",
  },
];

export default function About() {
  return (
    <>
      <Box
        maxWidth="xl"
        margin="auto"
        sx={{
          padding: (theme) => `${theme.spacing(5)} !important`,
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Grid item xs={12} md={6}>
            <Title title="Sobre os NFTs" />
            <Typography variant="h5" textAlign="justify">
              Solrigami é um marketplace de artes digitais na forma de NFT. A
              sigla NFT diz respeito a tokens não fungíveis, ativos únicos
              digitalmente transferíveis. Os NFTs utilizam a tecnologia
              blockchain, um banco de dados descentralizado e distribuído que
              permite reconhecer a propriedade, verificar a proveniência e
              realizar a negociação de bens físicos ou digitais de forma
              transparente.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              width="100%"
              height="450px"
              src={AboutSolrigamiIcons}
              alt="Imagem com representações de pássaros da aplicação Solrigami"
              style={{ objectFit: "cover" }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
            },
            alignItems: "flex-start",
            minHeight: "400px",
            marginBottom: 6,
          }}
        >
          <Grid item xs={12} md={6}>
            <img
              height="auto"
              width="100%"
              alt="Fluxograma de criação de uma arte digital NFT na blockchain"
              src={AboutExplainNFT}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                paddingLeft: {
                  xs: 0,
                  sm: 0,
                  md: 6,
                },
                paddingRight: {
                  xs: 0,
                  sm: 0,
                  md: 6,
                },
              }}
            >
              <Title title="Uso dos NFTs" />
              <Typography variant="h5" textAlign="justify">
                Já imaginou conseguir revender a um terceiro uma música comprada
                em um formato puramente digital? Ou vender uma arte digital com
                cobrança de royalty automática e sem intermediário? Ou até mesmo
                ter em sua propriedade parte de um imóvel? Tudo isso é
                possível por meio dos NFTs.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 6, marginBottom: 6 }}>
          <Box sx={{ textAlign: "center", marginBottom: 6 }}>
            <Title title="Características dos NFTs" />
          </Box>
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
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#023047" }}>
        <Box
          sx={{
            maxWidth: "xl",
            paddingTop: 12,
            paddingBottom: 12,
            margin: "auto",
          }}
        >
          <Typography
            color="white"
            variant="h4"
            component="h2"
            textAlign="center"
            sx={{
              textTransform: "uppercase",
              fontWeight: "500",
              marginBottom: (theme) => theme.spacing(8),
            }}
          >
            Crie suas artes digitais como NFT
          </Typography>
          <Grid container spacing={6}>
            {SOLRIGAMI_WALKTHROUGH.map((walkthrough, index) => (
              <Grid
                display="flex"
                justifyContent="center"
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <AboutApplicationCard
                  href={walkthrough.href}
                  buttonLabel={walkthrough.buttonLabel}
                  description={walkthrough.description}
                  title={walkthrough.title}
                  icon={walkthrough.icon}
                  alt={walkthrough.alt}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Box
        maxWidth="xl"
        margin="auto"
        sx={{
          marginTop: 8,
          padding: (theme) => `${theme.spacing(5)} !important`,
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 8 }}>
          <Title title="Saiba mais sobre o universo NFT" />
        </Box>
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
      </Box>
    </>
  );
}
