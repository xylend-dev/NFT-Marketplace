import React from "react";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Grid,
  Icon,
  Link,
} from "@mui/material";
import SolanaLogo from "../../assets/img/solana-logo.svg";
import ArweaveLogo from "../../assets/img/arweave-logo.svg";

export interface CustomIconProps {
  icon: string;
  alt: string;
}

const CustomIcon = (props: CustomIconProps) => {
  return (
    <Icon>
      <img height={20} width={20} alt={props.alt} src={props.icon} />
    </Icon>
  );
};

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
                height: "65vh",
                width: "100%",
                objectFit: "contain",
              }}
              image="https://arweave.net:443/zUbm91h7mvX-thD1J-V0h-4TXRLHtnDkCdiw-7aKQSs"
            />
            <CardActions>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Button
                    component={Link}
                    href="https://arweave.net:443/zUbm91h7mvX-thD1J-V0h-4TXRLHtnDkCdiw-7aKQSs"
                    target="_blank"
                    rel="noreferrer noopener"
                    startIcon={
                      <CustomIcon alt="Solana icon" icon={ArweaveLogo} />
                    }
                    variant="outlined"
                    fullWidth
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Visualizar imagem
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    component={Link}
                    href="https://solscan.io/token/8Vujaia92NYTcm62T2JZ17LmraAFHuevuJvTkPmNWwb8/?cluster=devnet"
                    target="_blank"
                    rel="noreferrer noopener"
                    startIcon={
                      <CustomIcon alt="Solana icon" icon={SolanaLogo} />
                    }
                    variant="outlined"
                    fullWidth
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Visualizar token
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item key="data" xs={12} sm={6}>
          <Card>Just a test</Card>
        </Grid>
      </Grid>
    </>
  );
}
