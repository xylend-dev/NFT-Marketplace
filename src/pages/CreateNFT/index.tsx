import React, { FormEvent } from "react";
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
// import { MetadataJson } from "@metaplex/js";
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

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
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
                  required
                  label="Nome"
                  variant="outlined"
                  helperText="Nome do colecionável"
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="nft-symbol"
                  label="Símbolo"
                  variant="outlined"
                  helperText="Símbolo do colecionável (ex.: BAYC)"
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              id="nft-description"
              label="Descrição"
              variant="outlined"
              multiline
              rows={2}
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
                  label="URL externa"
                  variant="outlined"
                  helperText="URL externa extra em que será possível visualizar o ativo"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <PrettoSlider
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
                  label="Grupo do colecionável"
                  variant="outlined"
                  helperText="Nome do grupo de uma coleção de ativos correlatos"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="nft-collection-item"
                  label="Nome identificador"
                  variant="outlined"
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
              Propriedades
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  id="nft-property-name"
                  label="Nome da propriedade"
                  variant="outlined"
                  helperText="Nome da propriedade relacionada ao ativo (ex.: cor)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="nft-property-value"
                  label="Valor da propriedade"
                  variant="outlined"
                  helperText="Valor da propriedade nomeada (ex.: azul)"
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
