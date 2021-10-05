import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateNFT from "./pages/CreateNFT";

export default function Routes() {
  return (
    <Switch>
      <Route path="/create" exact component={CreateNFT} />
    </Switch>
  );
}
