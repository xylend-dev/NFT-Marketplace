import {
  Button,
  ButtonProps,
  Collapse,
  Fade,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/FileCopy";
import DisconnectIcon from "@mui/icons-material/LinkOff";
import SwitchIcon from "@mui/icons-material/SwapHoriz";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, useMemo, useState } from "react";
import { useWalletDialog } from "./useWalletDialog";
import { WalletConnectButton } from "./WalletConnectButton";
import { WalletDialogButton } from "./WalletDialogButton";
import { WalletIcon } from "./WalletIcon";

export const WalletMultiButton: FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  children,
  ...props
}) => {
  const { publicKey, wallet, disconnect } = useWallet();
  const { setOpen } = useWalletDialog();
  const [anchor, setAnchor] = useState<HTMLElement>();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const content = useMemo(() => {
    if (children) return children;
    if (!wallet || !base58) return null;
    return base58.slice(0, 4) + ".." + base58.slice(-4);
  }, [children, wallet, base58]);

  if (!wallet) {
    return (
      <WalletDialogButton color={color} variant={variant} {...props}>
        {children}
      </WalletDialogButton>
    );
  }
  if (!base58) {
    return (
      <WalletConnectButton color={color} variant={variant} {...props}>
        {children}
      </WalletConnectButton>
    );
  }

  return (
    <>
      <Button
        color={color}
        variant={variant}
        startIcon={<WalletIcon wallet={wallet} />}
        onClick={(event) => setAnchor(event.currentTarget)}
        aria-controls="wallet-menu"
        aria-haspopup="true"
        {...props}
      >
        {content}
      </Button>
      <Menu
        id="wallet-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={() => setAnchor(undefined)}
        marginThreshold={0}
        TransitionComponent={Fade}
        transitionDuration={250}
        keepMounted
        sx={{
          "& .MuiMenuItem-root": {
            "&:hover": {
              backgroundColor: (theme) => `${theme.palette.primary.main}55`,
            },
          },
        }}
      >
        <Collapse in={!!anchor}>
          <MenuItem
            onClick={async () => {
              setAnchor(undefined);
              await navigator.clipboard.writeText(base58);
            }}
          >
            <ListItemIcon>
              <CopyIcon color="primary" />
            </ListItemIcon>
            Copiar endereço
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchor(undefined);
              setOpen(true);
            }}
          >
            <ListItemIcon>
              <SwitchIcon color="primary" />
            </ListItemIcon>
            Conectar outra carteira
          </MenuItem>
          <MenuItem
            onClick={() => {
              setAnchor(undefined);
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              disconnect().catch(() => {
                // Silently catch because any errors are caught by the context `onError` handler
              });
            }}
          >
            <ListItemIcon>
              <DisconnectIcon color="primary" />
            </ListItemIcon>
            Desconectar
          </MenuItem>
        </Collapse>
      </Menu>
    </>
  );
};
