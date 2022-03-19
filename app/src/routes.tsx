import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateNFT from "./pages/CreateNFT";
import ListNFT from "./pages/ListNFT";
import ShowNFT from "./pages/ShowNFT";
import Marketplace from "./pages/Marketplace";

export default function Routes() {
  return (
    <Switch>
      <Route path="/create" exact component={CreateNFT} />
      <Route path="/gallery" exact component={ListNFT} />
      <Route path="/gallery/:mint" exact component={ShowNFT} />
      <Route component={Marketplace} />
    </Switch>
  );
}
