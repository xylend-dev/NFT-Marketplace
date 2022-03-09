import React from "react";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  Icon,
  Link,
  Skeleton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import SolanaLogo from "../../assets/img/solana-logo.svg";
import ArweaveLogo from "../../assets/img/arweave-logo.svg";
import { network } from "../../config/solanaNetwork";
import { useNft } from "../../services/hooks/nft";
import NotFoundNFT from "../NotFoundNFT";

export interface ShowNFTButtonProps {
  href?: string;
  text: string;
  icon: string;
  alt: string;
}

const ShowNFTButton = (props: ShowNFTButtonProps) => {
  return (
    <Button
      component={Link}
      disabled={props.href ? false : true}
      href={props.href}
      target="_blank"
      rel="noreferrer noopener"
      startIcon={
        <Icon>
          <img height={20} width={20} alt={props.alt} src={props.icon} />
        </Icon>
      }
      variant="outlined"
      fullWidth
      sx={{
        textAlign: "center",
      }}
    >
      {props.text}
    </Button>
  );
};

const TableCellName = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: 0,
  paddingBottom: "1rem",
  width: "120px",
}));

const TableCellValue = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: 0,
  paddingBottom: "1rem",
  paddingLeft: "1rem",
}));

export default function ListNFT() {
  const { mint } = useParams<{ mint: string }>();
  const { data, error } = useNft(mint);

  return (
    <>
      {error !== undefined && <NotFoundNFT message="NFT não encontrado" />}
      {error === undefined && <Title title="Explorar NFT" />}
      <Grid container spacing={6}>
        <Grid item key="image" xs={12} md={6}>
          {data === undefined && error === undefined && (
            <Skeleton variant="rectangular" height="70vh" width="100%" />
          )}
          {data && (
            <Card sx={{ position: "sticky", top: 0 }}>
              <CardMedia
                component="img"
                alt={`${data.metadata.name} (NFT)`}
                sx={{
                  height: "auto",
                  maxWidth: "100%",
                }}
                image={data.metadata.image}
              />
              <CardActions sx={{ padding: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <ShowNFTButton
                      text="Visualizar imagem"
                      href={data.metadata.image}
                      alt="Arweave icon"
                      icon={ArweaveLogo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ShowNFTButton
                      text="Visualizar token"
                      href={`https://solscan.io/token/${data.nft.mint}/${
                        network === WalletAdapterNetwork.Devnet
                          ? "?cluster=devnet"
                          : ""
                      }`}
                      alt="Solana icon"
                      icon={SolanaLogo}
                    />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          )}
        </Grid>
        <Grid item key="data" xs={12} md={6}>
          {data === undefined && error === undefined && (
            <>
              <Skeleton variant="rectangular" height="33vh" width="100%" />
              <Skeleton
                variant="rectangular"
                height="33vh"
                width="100%"
                sx={{ marginTop: "4vh" }}
              />
            </>
          )}
          {data && (
            <>
              <Card>
                <Box padding={3}>
                  <Typography
                    color="primary"
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {data.metadata.name}{" "}
                    {data.metadata.symbol && `(${data.metadata.symbol})`}
                  </Typography>
                  {data.metadata.description && (
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 300, marginBottom: 2 }}
                    >
                      {data.metadata.description}
                    </Typography>
                  )}
                  {data.metadata.external_url && (
                    <Link
                      variant="h6"
                      target="_blank"
                      rel="noreferrer noopener"
                      href={data.metadata.external_url}
                    >
                      {data.metadata.external_url}
                    </Link>
                  )}
                </Box>
                <Divider />
                <Box display="flex" justifyContent="space-between" padding={3}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-end"
                    maxWidth="170px"
                    width="100%"
                  >
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                      Preço:
                    </Typography>
                    <Typography variant="h5">------ SOL</Typography>
                  </Box>
                  <Button
                    disabled
                    variant="contained"
                    startIcon={<AccountBalanceWalletIcon />}
                  >
                    Comprar
                  </Button>
                </Box>
              </Card>
              <Card sx={{ padding: 3, marginTop: 4 }}>
                <Typography
                  color="primary"
                  variant="h4"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Detalhes do NFT
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                  <TableContainer>
                    <Table sx={{ tableLayout: "fixed" }}>
                      <TableBody>
                        <TableRow>
                          <TableCellName>
                            <Typography variant="h5" sx={{ fontWeight: 500 }}>
                              Token
                            </Typography>
                          </TableCellName>
                          <TableCellValue>
                            <Typography
                              noWrap
                              variant="h6"
                              sx={{ fontWeight: 300 }}
                            >
                              {data.nft.mint}
                            </Typography>
                          </TableCellValue>
                        </TableRow>
                        <TableRow>
                          <TableCellName>
                            <Typography variant="h5" sx={{ fontWeight: 500 }}>
                              Dono
                            </Typography>
                          </TableCellName>
                          <TableCellValue>
                            <Typography
                              noWrap
                              variant="h6"
                              sx={{ fontWeight: 300, width: "100%" }}
                            >
                              {data.nft.updateAuthority}
                            </Typography>
                          </TableCellValue>
                        </TableRow>
                        {data.metadata.properties.creators &&
                          data.metadata.properties.creators !== [] && (
                            <TableRow>
                              <TableCellName>
                                <Typography
                                  variant="h5"
                                  sx={{ fontWeight: 500 }}
                                >
                                  Artista(s)
                                </Typography>
                              </TableCellName>
                              <TableCellValue>
                                <Typography
                                  noWrap
                                  component="div"
                                  variant="h6"
                                  sx={{ fontWeight: 300 }}
                                >
                                  {data.metadata.properties.creators[0].address}
                                </Typography>
                              </TableCellValue>
                            </TableRow>
                          )}
                        {data.metadata.seller_fee_basis_points && (
                          <TableRow>
                            <TableCellName>
                              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                                Royaties
                              </Typography>
                            </TableCellName>
                            <TableCellValue>
                              <Typography variant="h6" sx={{ fontWeight: 300 }}>
                                {data.metadata.seller_fee_basis_points / 100} %
                              </Typography>
                            </TableCellValue>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                {data.metadata.attributes && data.metadata.attributes !== [] && (
                  <Grid container spacing={1}>
                    {data.metadata.attributes.map((attribute, index) => (
                      <Grid item xs={6} sm={4}>
                        <Box
                          sx={{
                            border: (theme) =>
                              `2px solid ${theme.palette.primary.main}`,
                            borderRadius: 4,
                            padding: 2,
                          }}
                        >
                          <Typography variant="body1" color="#023047">
                            {attribute.trait_type}
                          </Typography>
                          <Typography variant="body1">
                            {attribute.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Card>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
