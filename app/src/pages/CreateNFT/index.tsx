import React, { ChangeEvent, FormEvent, useState } from "react";
import Lottie from "react-lottie";
import {
  actions,
  MetadataJson,
  MetadataJsonCreator,
  MetadataJsonProperties,
} from "@metaplex/js";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import Title from "../../components/Title";
import CreateNFTCard, {
  CreateNFTCardImageProps,
} from "../../components/CreateNFTCard";
import LoadingAnimation from "../../assets/animation/loading.json";
import { arweaveEndpoint } from "../../config/arweaveNetwork";
import { connection } from "../../config/solanaNetwork";
import { PrettoSlider } from "./styles";
import { defaultAnimationOptions } from "../../utils/lottie";
import { uploadData } from "../../utils/arweave/uploadData";
import { cacheCreatedNft } from "../../utils/cache";
import { defaultNftMetadata } from "../../utils/nft";
import { validateNftAttributes } from "../../utils/validation";
import api from "../../services/api";
import { NftCreatedData } from "../../types/types";

const MAX_ATTRIBUTE_FIELDS = 15;
const royaltiesMarks = [
  {
    value: 50 * 100,
    label: "50%",
  },
];

function getRoyaltiesText(value: number) {
  return value / 100 + "%";
}

export default function CreateNFT() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState<CreateNFTCardImageProps>();
  const [isUploadingNFT, setIsUploadingNFT] = useState(false);
  const [nftMetadata, setNftMetadata] =
    useState<MetadataJson>(defaultNftMetadata);

  const handleAddAttribute = () => {
    if (
      !nftMetadata.attributes ||
      nftMetadata.attributes.length > MAX_ATTRIBUTE_FIELDS
    ) {
      return;
    }

    const attributes = [
      ...nftMetadata.attributes,
      { trait_type: "", value: "" },
    ];

    setNftMetadata({ ...nftMetadata, attributes });
  };

  const handleChangeAttributes = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    if (!nftMetadata.attributes || nftMetadata.attributes.length < index + 1) {
      return;
    }

    const { value, name } = evt.target;
    const attributes = [...nftMetadata.attributes];
    attributes[index] = {
      ...attributes[index],
      [name]: value,
    };

    setNftMetadata({ ...nftMetadata, attributes });
  };

  const handleRemoveAttribute = () => {
    if (!nftMetadata.attributes || nftMetadata.attributes.length <= 1) {
      return;
    }

    const attributes = nftMetadata.attributes;
    attributes.pop();

    setNftMetadata({ ...nftMetadata, attributes });
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setIsUploadingNFT(true);

    if (!publicKey || !signTransaction || !signAllTransactions) {
      enqueueSnackbar("Conecte-se a sua carteira digital", {
        variant: "error",
      });
      setIsUploadingNFT(false);
      return;
    }

    if (!image) {
      enqueueSnackbar("Escolha uma imagem para criar o NFT", {
        variant: "error",
      });
      setIsUploadingNFT(false);
      return;
    }

    if (
      (nftMetadata.collection?.name && !nftMetadata.collection?.family) ||
      (!nftMetadata.collection?.name && nftMetadata.collection?.family)
    ) {
      enqueueSnackbar(
        "As informações do grupo do colecionável estão inconsistentes",
        {
          variant: "error",
        }
      );
      setIsUploadingNFT(false);
      return;
    }

    const { finalAttributes, errors } = validateNftAttributes(
      nftMetadata.attributes
    );
    if (errors.length !== 0) {
      for (let error of errors) {
        enqueueSnackbar(error, { variant: "error" });
      }
      setIsUploadingNFT(false);
      return;
    }

    const userWalletAddress = publicKey.toBase58();
    const creator: MetadataJsonCreator = {
      address: userWalletAddress,
      verified: true,
      share: 100,
    };

    let imageTransaction;
    try {
      imageTransaction = await uploadData(image.image, image.type, true);
    } catch (e) {
      enqueueSnackbar("Erro ao realizar o upload da imagem do NFT", {
        variant: "error",
      });
      setIsUploadingNFT(false);
      return;
    }
    const imageUri = `${arweaveEndpoint}/${imageTransaction.id}`;

    const properties: MetadataJsonProperties = {
      creators: [creator],
      category: "image",
      files: [{ uri: imageUri, type: image.type }],
    };

    let finalNftMetadata: MetadataJson = {
      name: nftMetadata.name,
      symbol: nftMetadata.symbol,
      description: nftMetadata.description,
      seller_fee_basis_points: nftMetadata.seller_fee_basis_points,
      image: imageUri,
      ...(nftMetadata.external_url && {
        external_url: nftMetadata.external_url,
      }),
      ...(finalAttributes &&
        finalAttributes.length > 0 && {
          attributes: finalAttributes,
        }),
      ...(nftMetadata.collection &&
        nftMetadata.collection.name &&
        nftMetadata.collection.family && {
          collection: {
            name: nftMetadata.collection.name,
            family: nftMetadata.collection.family,
          },
        }),
      properties: properties,
    };

    let metadataTransaction;
    try {
      metadataTransaction = await uploadData(
        JSON.stringify(finalNftMetadata),
        "application/json"
      );
    } catch (e) {
      enqueueSnackbar("Erro ao realizar o upload dos metadados do NFT", {
        variant: "error",
      });
      setIsUploadingNFT(false);
      return;
    }
    const metadataTransactionUri = `${arweaveEndpoint}/${metadataTransaction.id}`;

    setNftMetadata({
      ...finalNftMetadata,
      ...(finalAttributes &&
        finalAttributes.length === 0 && {
          attributes: [
            {
              trait_type: "",
              value: "",
            },
          ],
        }),
    });
    setImage(undefined);

    let nft;
    try {
      nft = await actions.mintNFT({
        connection: connection,
        wallet: {
          publicKey,
          signTransaction,
          signAllTransactions,
        },
        uri: metadataTransactionUri,
        maxSupply: 1,
      });
    } catch (e) {
      enqueueSnackbar(
        "Erro ao realizar a criação do NFT na blockchain Solana",
        {
          variant: "error",
        }
      );
      setIsUploadingNFT(false);
      return;
    }

    await api
      .post<NftCreatedData>("/nft/create", {
        mint: nft.mint.toBase58(),
      })
      .then(() => {
        console.log("NFT adicionado a lista de NFTs recém-criados");
      })
      .catch(() => {
        console.log(
          "Não foi possível salvar o NFT na lista de NFTs recém-criados"
        );
      });

    setIsUploadingNFT(false);
    cacheCreatedNft(metadataTransactionUri, nft.mint.toString());
    enqueueSnackbar(`NFT ${finalNftMetadata.name} criado com sucesso!`, {
      variant: "success",
    });
  };

  const handleChangeTextField = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = evt.target;

    let newNftAttribute = {};
    if (name === "collection_name") {
      newNftAttribute = {
        collection: {
          name: value,
          family: nftMetadata.collection?.family,
        },
      };
    } else if (name === "collection_family") {
      newNftAttribute = {
        collection: {
          name: nftMetadata.collection?.name,
          family: value,
        },
      };
    } else {
      newNftAttribute = {
        [name]: value,
      };
    }
    const newNftMetadata = { ...nftMetadata, ...newNftAttribute };
    setNftMetadata(newNftMetadata);
  };

  const handleSliderChange = (_: Event, value: number | number[]) => {
    let sellerFeeBasisPoints = 0;
    if (value instanceof Array && value.length > 0) {
      sellerFeeBasisPoints = value[0];
    } else if (!(value instanceof Array)) {
      sellerFeeBasisPoints = value;
    }

    setNftMetadata({
      ...nftMetadata,
      seller_fee_basis_points: sellerFeeBasisPoints,
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        overflowX: "hidden",
        padding: (theme) => `${theme.spacing(5)} !important`,
      }}
    >
      <Grid container display="flex" justifyContent="space-between">
        <Title title="Criar NFT" />
        <ButtonWithTooltip
          form="nft-create"
          type="submit"
          tooltipText="Conecte-se a sua carteira digital"
          disabled={!publicKey || isUploadingNFT ? true : false}
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Criar NFT
        </ButtonWithTooltip>
      </Grid>
      {isUploadingNFT && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            marginTop: "10vh",
          }}
        >
          <Lottie
            options={{
              ...defaultAnimationOptions,
              animationData: LoadingAnimation,
            }}
            height={200}
            width={200}
          />
          <Typography
            color="primary"
            variant="h5"
            component="h2"
            gutterBottom
            align="center"
            sx={{
              maxWidth: "600px",
            }}
          >
            Carregando imagem e criando o NFT...
          </Typography>
        </Box>
      )}
      {!isUploadingNFT && (
        <form id="nft-create" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container>
            <Grid item key="image" xs={4}>
              <CreateNFTCard
                name={nftMetadata.name}
                description={nftMetadata.description}
                image={image}
                setImage={setImage}
              />
            </Grid>
            <Grid item key="title" xs={8}>
              <Typography
                color="primary"
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "500",
                  marginBottom: (theme) => theme.spacing(2),
                }}
              >
                Informações básicas
              </Typography>
              <Grid container spacing={4}>
                <Grid item key="name" xs={8}>
                  <TextField
                    id="nft-name"
                    name="name"
                    required
                    label="Nome"
                    variant="outlined"
                    value={nftMetadata.name}
                    onChange={handleChangeTextField}
                    helperText="Nome do colecionável"
                    fullWidth
                  />
                </Grid>
                <Grid item key="symbol" xs={4}>
                  <TextField
                    id="nft-symbol"
                    name="symbol"
                    label="Símbolo"
                    variant="outlined"
                    value={nftMetadata.symbol}
                    onChange={handleChangeTextField}
                    helperText="Símbolo do colecionável (ex.: BAYC)"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <TextField
                id="nft-description"
                name="description"
                label="Descrição"
                variant="outlined"
                multiline
                rows={2}
                value={nftMetadata.description}
                onChange={handleChangeTextField}
                helperText="Descrição do colecionável"
                fullWidth
                sx={{ marginTop: (theme) => theme.spacing(3) }}
              />
              <Typography
                color="primary"
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  textTransform: "uppercase",
                  fontWeight: "500",
                  marginBottom: (theme) => theme.spacing(2),
                  marginTop: (theme) => theme.spacing(2),
                }}
              >
                Informações avançadas
              </Typography>
              <Grid container spacing={4}>
                <Grid item key="external_url" xs={6}>
                  <TextField
                    id="nft-external-url"
                    name="external_url"
                    label="URL externa"
                    variant="outlined"
                    value={nftMetadata.external_url}
                    onChange={handleChangeTextField}
                    helperText="URL externa extra em que será possível visualizar o ativo"
                    fullWidth
                  />
                </Grid>
                <Grid item key="seller_fee_basis_points" xs={6}>
                  <Box>
                    <PrettoSlider
                      value={
                        typeof nftMetadata.seller_fee_basis_points === "number"
                          ? nftMetadata.seller_fee_basis_points
                          : 0
                      }
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                      aria-label="Royalties to NFT author"
                      defaultValue={0}
                      step={1 * 100}
                      marks={royaltiesMarks}
                      max={50 * 100}
                      valueLabelDisplay="on"
                      getAriaValueText={getRoyaltiesText}
                      valueLabelFormat={getRoyaltiesText}
                    />
                    <FormHelperText sx={{ marginTop: "-2.0px" }}>
                      Porcentagem de royalties paga ao criador a cada venda do
                      ativo
                    </FormHelperText>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                columnSpacing={4}
                sx={{ marginTop: (theme) => theme.spacing(3) }}
              >
                <Grid item key="collection_family" xs={6}>
                  <TextField
                    id="nft-collection-name"
                    name="collection_family"
                    label="Grupo do colecionável"
                    variant="outlined"
                    value={nftMetadata.collection?.family}
                    onChange={handleChangeTextField}
                    helperText="Nome do grupo de uma coleção de ativos correlatos"
                    fullWidth
                  />
                </Grid>
                <Grid item key="collection_name" xs={6}>
                  <TextField
                    id="nft-collection-item"
                    name="collection_name"
                    label="Nome identificador"
                    variant="outlined"
                    value={nftMetadata.collection?.name}
                    onChange={handleChangeTextField}
                    helperText="Nome que identifica unicamente o ativo na coleção"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography
                color="primary"
                variant="h6"
                component="h2"
                sx={{
                  marginTop: (theme) => theme.spacing(2),
                  marginBottom: (theme) => theme.spacing(2),
                }}
              >
                Atributos
              </Typography>
              <Box>
                {nftMetadata.attributes &&
                  nftMetadata.attributes.map((attribute, index) => {
                    return (
                      <Grid
                        container
                        spacing={4}
                        sx={{
                          marginBottom: (theme) => theme.spacing(2),
                        }}
                        key={`attribute_${index}`}
                      >
                        <Grid item key={`trait_type_${index}`} xs={6}>
                          <TextField
                            id="nft-property-name"
                            name="trait_type"
                            label="Nome do atributo"
                            variant="outlined"
                            value={attribute.trait_type}
                            onChange={(evt) =>
                              handleChangeAttributes(evt, index)
                            }
                            helperText="Nome da atributo relacionada ao ativo (ex.: cor)"
                            fullWidth
                          />
                        </Grid>
                        <Grid item key={`value_${index}`} xs={6}>
                          <TextField
                            id="nft-property-value"
                            name="value"
                            label="Valor do atributo"
                            variant="outlined"
                            value={attribute.value}
                            onChange={(evt) =>
                              handleChangeAttributes(evt, index)
                            }
                            helperText="Valor do atributo nomeado (ex.: azul)"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                <Box margin={2} marginLeft={0}>
                  {nftMetadata.attributes &&
                    nftMetadata.attributes.length <= MAX_ATTRIBUTE_FIELDS && (
                      <Button
                        startIcon={<Add />}
                        variant="outlined"
                        onClick={() => handleAddAttribute()}
                      >
                        Adicionar atributo
                      </Button>
                    )}
                  {nftMetadata.attributes && nftMetadata.attributes.length > 1 && (
                    <Button
                      startIcon={<Delete />}
                      variant="outlined"
                      onClick={() => handleRemoveAttribute()}
                      sx={{ marginLeft: (theme) => theme.spacing(2) }}
                    >
                      Remover último
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}
