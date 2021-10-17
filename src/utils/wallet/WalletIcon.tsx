import React, { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";
import { Wallet } from "@solana/wallet-adapter-wallets";

export interface WalletIconProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  wallet: Wallet | null;
}

export const WalletIcon: FC<WalletIconProps> = ({ wallet, ...props }) => {
  return (
    wallet && (
      <img
        src={wallet.icon}
        alt={`${wallet.name} icon`}
        style={{ width: 24, height: 24 }}
        {...props}
      />
    )
  );
};
