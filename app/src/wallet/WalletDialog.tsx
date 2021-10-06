import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-wallets";
import Typography from "@mui/material/Typography";
import React, {
  FC,
  ReactElement,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useWalletDialog } from "./useWalletDialog";
import { WalletListItem } from "./WalletListItem";

export interface WalletDialogProps extends Omit<DialogProps, "title" | "open"> {
  featuredWallets?: number;
  title?: ReactElement;
}

export const WalletDialog: FC<WalletDialogProps> = ({
  title = "Selecione sua carteira",
  featuredWallets = 3,
  onClose,
  ...props
}) => {
  const { wallets, select } = useWallet();
  const { open, setOpen } = useWalletDialog();
  const [expanded, setExpanded] = useState(false);

  const [featured, more] = useMemo(
    () => [wallets.slice(0, featuredWallets), wallets.slice(featuredWallets)],
    [wallets, featuredWallets]
  );

  const handleClose = useCallback(
    (event: SyntheticEvent, reason?: "backdropClick" | "escapeKeyDown") => {
      if (onClose) onClose(event, reason!);
      if (!event.defaultPrevented) setOpen(false);
    },
    [setOpen, onClose]
  );

  const handleWalletClick = useCallback(
    (event: SyntheticEvent, walletName: WalletName) => {
      select(walletName);
      handleClose(event);
    },
    [select, handleClose]
  );

  const handleExpandClick = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded]
  );

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      onClose={handleClose}
      {...props}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: "primary.main",
            textTransform: "uppercase",
          }}
        >
          Escolha sua carteira
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {featured.map((wallet) => (
            <WalletListItem
              key={wallet.name}
              onClick={(event) => handleWalletClick(event, wallet.name)}
              wallet={wallet}
            />
          ))}
          {more.length ? (
            <>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List sx={{ padding: 0 }}>
                  {more.map((wallet) => (
                    <WalletListItem
                      key={wallet.name}
                      onClick={(event) => handleWalletClick(event, wallet.name)}
                      wallet={wallet}
                    />
                  ))}
                </List>
              </Collapse>
              <ListItem sx={{ paddingLeft: 0 }}>
                <Button onClick={handleExpandClick}>
                  {expanded ? "Menos" : "Mais"} opções
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </Button>
              </ListItem>
            </>
          ) : null}
        </List>
      </DialogContent>
    </Dialog>
  );
};
