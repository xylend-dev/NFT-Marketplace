import { styled, TableCell } from "@mui/material";

export const TableCellName = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: 0,
  paddingBottom: "1rem",
  width: "120px",
}));

export const TableCellValue = styled(TableCell)(({ theme }) => ({
  borderBottom: "none",
  padding: 0,
  paddingBottom: "1rem",
  paddingLeft: "1rem",
}));
