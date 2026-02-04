import { AxiosErrorShape, errorHandler } from "../config/axios-error";
import { publicApi } from "../config/axios-instance";
import { CryptoAsset } from "../interfaces";

export const getCryptoAssets = async (): Promise<CryptoAsset[]> => {
  try {
    const response = await publicApi.get<CryptoAsset[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    return response.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};