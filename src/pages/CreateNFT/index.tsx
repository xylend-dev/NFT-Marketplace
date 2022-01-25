import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  Slider,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MetadataJson } from "@metaplex/js";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonWithTooltip from "../../components/ButtonWithTooltip";
import Title from "../../components/Title";
import ImageDropzone from "../../components/ImageDropzone";

const royaltiesMarks = [
  {
    value: 50,
    label: "50%",
  },
];

function getRoyaltiesText(value: number) {
  return value + "%";
}

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

export default function CreateNFT() {
  const { publicKey } = useWallet();
  const [nftMetadata, setNftMetadata] = useState<MetadataJson>({
    name: "",
    symbol: "",
    description: "",
    seller_fee_basis_points: 0,
    image: "",
    external_url: "",
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

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
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
    console.log(value);
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
            <Card
              sx={{
                marginRight: (theme) => theme.spacing(5),
                position: "sticky",
                top: 0,
              }}
            >
              <ImageDropzone />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Solrigami Bird #03
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Coleção exclusiva da plataforma Solrigami com a representação
                  de pássaros através de origamis. Solrigami Bird #3.
                </Typography>
              </CardContent>
            </Card>
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
                    step={1}
                    marks={royaltiesMarks}
                    max={50}
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
                marginBottom: (theme) => theme.spacing(2),
                marginTop: (theme) => theme.spacing(2),
              }}
            >
              Atributos
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  id="nft-property-name"
                  label="Nome do atributo"
                  variant="outlined"
                  helperText="Nome da atributo relacionada ao ativo (ex.: cor)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="nft-property-value"
                  label="Valor da atributo"
                  variant="outlined"
                  helperText="Valor da atributo nomeado (ex.: azul)"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
