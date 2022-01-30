import React, { ChangeEvent, FormEvent, useState } from "react";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  MetadataJson,
  MetadataJsonCreator,
  MetadataJsonProperties,
} from "@metaplex/js";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import Title from "../../components/Title";
import CreateNFTCard, {
  CreateNFTCardImageProps,
} from "../../components/CreateNFTCard";
import { Add, Delete } from "@mui/icons-material";
import { uploadData } from "../../utils/arweave/uploadData";
import { arweaveEndpoint } from "../../config/arweaveNetwork";

const PrettoSlider = styled(Slider)({
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#FFFFFF",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#FB8500",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

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
  const { publicKey } = useWallet();
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState<CreateNFTCardImageProps>();

  const [nftMetadata, setNftMetadata] = useState<MetadataJson>({
    name: "",
    symbol: "",
    description: "",
    seller_fee_basis_points: 0,
    image: "",
    external_url: "",
    attributes: [
      {
        trait_type: "",
        value: "",
      },
    ],
    collection: {
      family: "",
      name: "",
    },
    properties: {
      files: [],
      category: "image",
      creators: [],
    },
  });

  const handleRemoveAttribute = () => {
    if (!nftMetadata.attributes || nftMetadata.attributes.length <= 1) {
      return;
    }

    const attributes = nftMetadata.attributes;
    attributes.pop();

    setNftMetadata({
      ...nftMetadata,
      attributes,
    });
  };

  const handleAddAttribute = () => {
    if (
      !nftMetadata.attributes ||
      nftMetadata.attributes.length > MAX_ATTRIBUTE_FIELDS
    ) {
      return;
    }

    const attributes = [
      ...nftMetadata.attributes,
      {
        trait_type: "",
        value: "",
      },
    ];

    setNftMetadata({
      ...nftMetadata,
      attributes,
    });
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

    setNftMetadata({
      ...nftMetadata,
      attributes,
    });
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!publicKey) {
      enqueueSnackbar("Conecte-se a sua carteira digital", {
        variant: "error",
      });
      return;
    }

    if (!image) {
      enqueueSnackbar("Escolha uma imagem para criar o NFT", {
        variant: "error",
      });
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
      return;
    }

    const attributes = [];
    if (nftMetadata.attributes && nftMetadata.attributes.length > 0) {
      let hasAttributeMisuse = false;
      for (let attribute of nftMetadata.attributes) {
        if (attribute.trait_type === "" && attribute.value !== "") {
          enqueueSnackbar(
            `O atributo de valor '${attribute.value}' está sem nome`,
            {
              variant: "error",
            }
          );
          hasAttributeMisuse = true;
        }
        if (attribute.trait_type !== "" && attribute.value === "") {
          enqueueSnackbar(
            `O atributo de nome '${attribute.trait_type}' está sem valor`,
            {
              variant: "error",
            }
          );
          hasAttributeMisuse = true;
        }

        if (attribute.trait_type !== "" && attribute.value !== "") {
          attributes.push({
            trait_type: attribute.trait_type,
            value: attribute.value,
          });
        }
      }
      if (hasAttributeMisuse) {
        return;
      }
    }

    const userWalletAddress = publicKey.toBase58();
    const creator: MetadataJsonCreator = {
      address: userWalletAddress,
      verified: true,
      share: 100,
    };

    const properties: MetadataJsonProperties = {
      creators: [creator],
      category: "image",
      files: [{ uri: nftMetadata.image, type: image.type }],
    };

    const imageTransaction = await uploadData(image.image, image.type, true);
    const imageUri = `${arweaveEndpoint}/${imageTransaction.id}`;

    let finalNftMetadata: MetadataJson = {
      name: nftMetadata.name,
      symbol: nftMetadata.symbol,
      description: nftMetadata.description,
      seller_fee_basis_points: nftMetadata.seller_fee_basis_points,
      image: imageUri,
      ...(nftMetadata.external_url && {
        external_url: nftMetadata.external_url,
      }),
      ...(attributes &&
        attributes.length > 0 && {
          attributes: attributes,
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

    const metadataTransaction = await uploadData(
      JSON.stringify(finalNftMetadata),
      "application/json"
    );
    const metadataTransactionUri = `${arweaveEndpoint}/${metadataTransaction.id}`;
    console.log(metadataTransactionUri);

    setNftMetadata(finalNftMetadata);
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
    <>
      <Grid container display="flex" justifyContent="space-between">
        <Title title="Criar NFT" />
        <ButtonWithTooltip
          form="nft-create"
          type="submit"
          tooltipText="Conecte-se a sua carteira digital"
          disabled={publicKey ? false : true}
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Criar NFT
        </ButtonWithTooltip>
      </Grid>
      <form id="nft-create" autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <CreateNFTCard
              name={nftMetadata.name}
              description={nftMetadata.description}
              image={image}
              setImage={setImage}
            />
          </Grid>
          <Grid item xs={8}>
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
              <Grid item xs={8}>
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
              <Grid item xs={4}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                    >
                      <Grid item xs={6}>
                        <TextField
                          id="nft-property-name"
                          name="trait_type"
                          label="Nome do atributo"
                          variant="outlined"
                          value={attribute.trait_type}
                          onChange={(evt) => handleChangeAttributes(evt, index)}
                          helperText="Nome da atributo relacionada ao ativo (ex.: cor)"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="nft-property-value"
                          name="value"
                          label="Valor do atributo"
                          variant="outlined"
                          value={attribute.value}
                          onChange={(evt) => handleChangeAttributes(evt, index)}
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
    </>
  );
}
