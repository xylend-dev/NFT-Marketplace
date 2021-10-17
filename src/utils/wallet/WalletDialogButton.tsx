import { Button, ButtonProps } from "@mui/material";
import React, { FC, MouseEventHandler, useCallback } from "react";
import { useWalletDialog } from "./useWalletDialog";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export const WalletDialogButton: FC<ButtonProps> = ({
  children = "Conectar carteira",
  color = "primary",
  variant = "contained",
  onClick,
  ...props
}) => {
  const { setOpen } = useWalletDialog();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) setOpen(true);
    },
    [onClick, setOpen]
  );

  return (
    <Button
      startIcon={<AccountBalanceWalletIcon />}
      color={color}
      variant={variant}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
};
