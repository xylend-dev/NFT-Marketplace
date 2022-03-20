import React from "react";
import { Button, ButtonProps, Tooltip } from "@mui/material";

export interface ButtonWithTooltipProps extends ButtonProps {
  tooltipText: string;
}

export default function ButtonWithTooltip({
  tooltipText,
  disabled,
  onClick,
  ...props
}: ButtonWithTooltipProps) {
  tooltipText = disabled ? tooltipText : "";
  const adjustedButtonProps = {
    disabled: disabled,
    component: disabled ? "div" : undefined,
    onClick: disabled ? undefined : onClick,
  };

  return (
    <Tooltip title={tooltipText}>
      <Button
        {...props}
        {...adjustedButtonProps}
        sx={{
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
          height: "100%",
        }}
      />
    </Tooltip>
  );
}
