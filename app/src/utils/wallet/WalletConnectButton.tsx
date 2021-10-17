import React, { FC, MouseEventHandler, useCallback, useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletIcon } from "./WalletIcon";

export const WalletConnectButton: FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  children,
  disabled,
  onClick,
  ...props
}) => {
  const { wallet, connect, connecting, connected } = useWallet();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (onClick) onClick(event);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      if (!event.defaultPrevented)
        connect().catch(() => {
          // Silently catch because any errors are caught by the context `onError` handler
        });
    },
    [onClick, connect]
  );

  const content = useMemo(() => {
    if (children) return children;
    if (connecting) return "Conectando...";
    if (connected) return "Conectado";
    if (wallet) return "Conectar";
    return "Connect Wallet";
  }, [children, connecting, connected, wallet]);

  return (
    <Button
      color={color}
      variant={variant}
      onClick={handleClick}
      disabled={disabled || !wallet || connecting || connected}
      startIcon={<WalletIcon wallet={wallet} />}
      {...props}
    >
      {content}
    </Button>
  );
};
