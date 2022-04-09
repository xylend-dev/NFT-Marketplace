export interface ErrorResponse {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ErrorsResponse {
  errors: Array<ErrorResponse>;
}

export interface IsLikeAdded {
  mint: string,
  walletAddress: string,
  isLikeAdded: boolean,
}

export interface NftExtraData {
  mint: string;
  numberLikes: number;
}

export interface NftCreatedData {
  mint: string;
  createdAt: string;
}
