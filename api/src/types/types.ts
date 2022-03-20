export interface SolanaBaseResponse {
  jsonrpc: string;
  id: number;
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
