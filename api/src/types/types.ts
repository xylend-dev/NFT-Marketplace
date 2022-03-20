export interface SolanaBaseResponse {
  jsonrpc: string;
  id: number;
}

export interface SolanaErrorDetailResponse {
  code: number;
  message: string;
}

export interface SolanaErrorResponse extends SolanaBaseResponse {
  error: SolanaErrorDetailResponse;
}

export interface SolanaContextResponse {
  slot: string;
}

export interface SolanaBalanceResponse extends SolanaBaseResponse {
  result: {
    context: SolanaContextResponse;
    value: number;
  };
}

export interface SolanaTokenSupplyValueResponse {
  amount: string;
  decimals: number;
  uiAmount: number;
  uiAmountString: string;
}

export interface SolanaTokenSupplyResponse extends SolanaBaseResponse {
  result: {
    context: SolanaContextResponse;
    value: SolanaTokenSupplyValueResponse;
  };
}
