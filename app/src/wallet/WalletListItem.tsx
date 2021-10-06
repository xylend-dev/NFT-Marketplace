import { Button, ListItem, ListItemProps } from "@mui/material";
import { Wallet } from "@solana/wallet-adapter-wallets";
import React, { FC, MouseEventHandler } from "react";
import { WalletIcon } from "./WalletIcon";

interface WalletListItemProps
  extends Omit<ListItemProps, "onClick" | "button"> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  wallet: Wallet;
}

export const WalletListItem: FC<WalletListItemProps> = ({
  onClick,
  wallet,
  ...props
}) => {
  return (
    <ListItem
      {...props}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.secondary.main}`,
        maxHeight: 48,
        minHeight: 48,
        paddingLeft: 0,
        paddingRight: 0,
        "& .MuiButton-root": {
          "&:hover": {
            backgroundColor: "secondary.main",
          },
        },
      }}
    >
      <Button
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
        color="inherit"
        onClick={onClick}
        endIcon={<WalletIcon wallet={wallet} />}
      >
        {wallet.name}
      </Button>
    </ListItem>
  );
};
