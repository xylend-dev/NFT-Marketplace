import React from "react";
import Title from "../../components/Title";
import { useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Icon, Typography } from "@mui/material";
import SolanaLogo from "../../assets/img/solana-logo.svg";


export default function ListNFT() {
  const { mint } = useParams<{ mint: string }>();
  return (
    <>
      <Title title="Explorar NFT" />
      <Grid container>
        <Grid item key="image" xs={6}>
          <Card>
            <CardMedia
              component="img"
              alt="green iguana"
              sx={{
                height: '50vh'
              }}
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button startIcon={<Icon><img alt="Solana logo" src={SolanaLogo} /></Icon>} size="small" variant="outlined">Visualizar imagem</Button>
              <Button size="small" variant="outlined">Visualizar token</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item key="image" xs={6}></Grid>
      </Grid>
    </>
  );
}
