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
  styled,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SolanaLogo from "../../assets/img/solana-logo.svg";
import ArweaveLogo from "../../assets/img/arweave-logo.svg";

export interface ShowNFTButtonProps {
  href: string;
  text: string;
  icon: string;
  alt: string;
}

const ShowNFTButton = (props: ShowNFTButtonProps) => {
  return (
    <Button
      component={Link}
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
  width: "150px",
  padding: 0,
  paddingBottom: "1rem",
}));

const TableCellValue = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: 0,
  paddingBottom: "1rem",
}));

export default function ListNFT() {
  const { mint } = useParams<{ mint: string }>();
  return (
    <>
      <Title title="Explorar NFT" />
      <Grid container spacing={6}>
        <Grid item key="image" xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              alt="green iguana"
              sx={{
                height: "auto",
                maxWidth: "100%",
              }}
              image="https://www.arweave.net/BSe9kvjgwXVkKxjDriSrMWhqDCGnkrr853fZEU_IqFA?ext=png"
            />
            <CardActions sx={{ padding: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <ShowNFTButton
                    text="Visualizar imagem"
                    href="https://arweave.net:443/zUbm91h7mvX-thD1J-V0h-4TXRLHtnDkCdiw-7aKQSs"
                    alt="Arweave icon"
                    icon={ArweaveLogo}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ShowNFTButton
                    text="Visualizar token"
                    href="https://solscan.io/token/8Vujaia92NYTcm62T2JZ17LmraAFHuevuJvTkPmNWwb8/?cluster=devnet"
                    alt="Arweave icon"
                    icon={SolanaLogo}
                  />
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item key="data" xs={12} sm={6}>
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
                Solrigami Bird #03 (SGB)
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 300, marginBottom: 2 }}
              >
                Coleção exclusiva da plataforma Solrigami com a exibição de
                pássaros através de origamis. Solrigami Bird #3.
              </Typography>
              <Link
                variant="h6"
                target="_blank"
                rel="noreferrer noopener"
                href="https://solrigami.com"
              >
                https://solrigami.com
              </Link>
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
                <Typography variant="h5">0,23 SOL</Typography>
              </Box>
              <Button
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
                <Table>
                  <TableRow>
                    <TableCellName>
                      <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        Token
                      </Typography>
                    </TableCellName>
                    <TableCellValue>
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        129839ESDB981G27EHNAD
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
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        129839ESDB981G27EHNAD
                      </Typography>
                    </TableCellValue>
                  </TableRow>
                  <TableRow>
                    <TableCellName>
                      <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        Artista(s)
                      </Typography>
                    </TableCellName>
                    <TableCellValue>
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        129839ESDB981G27EHNAD
                      </Typography>
                    </TableCellValue>
                  </TableRow>
                  <TableRow>
                    <TableCellName>
                      <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        Royaties
                      </Typography>
                    </TableCellName>
                    <TableCellValue>
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        10%
                      </Typography>
                    </TableCellValue>
                  </TableRow>
                </Table>
              </TableContainer>
            </Box>
            <Grid container>
              <Grid item>
                <Box
                  sx={{
                    border: (theme) =>
                      `2px solid ${theme.palette.primary.main}`,
                    borderRadius: 1,
                    padding: 1,
                  }}
                >
                  <Typography variant="h6" color="#023047">
                    Cor
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 300 }}>
                    Azul Marinho
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
