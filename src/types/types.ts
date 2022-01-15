export interface NftAttribute {
    trait_type: string;
    value: string;
}

export interface NftFile {
    type: string;
    uri: string;
    cnd: boolean;
}

export interface NftCreator {
    address: string;
    share: number;
}

export interface Nft {
    name: string;
    symbol: string;
    description: string;
    seller_fee_basis_points: number;
    image: string;
    animation_url: string;
    external_url: string;
    attributes: NftAttribute[];
    collection: {
        name: string;
        family: string;
    };
    properties: {
        files: NftFile[];
        category: string;
        creators: NftCreator[];
    };
}
