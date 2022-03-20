export interface ErrorResponse {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface ErrorsResponse {
  errors: Array<ErrorResponse>;
}

export interface NftExtraData {
  mint: string;
  numberLikes: number;
}
