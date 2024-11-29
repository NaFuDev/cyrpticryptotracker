const COINCAP_API = 'https://api.coincap.io/v2';

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}

export interface AssetHistory {
  priceUsd: string;
  time: number;
}

export const getAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${COINCAP_API}/assets?limit=50`);
  const data = await response.json();
  return data.data;
};

export const getAsset = async (id: string): Promise<Asset> => {
  const response = await fetch(`${COINCAP_API}/assets/${id}`);
  const data = await response.json();
  return data.data;
};

export const getAssetHistory = async (id: string): Promise<AssetHistory[]> => {
  const response = await fetch(`${COINCAP_API}/assets/${id}/history?interval=h1`);
  const data = await response.json();
  return data.data;
};