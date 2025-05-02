import { Asset } from "@highwater/types/src/asset";

let assetCache: Asset[] = [];

export function saveAssets(assets: Asset[]) {
  assetCache = assets;
}

export function getAssets(): Asset[] {
  return assetCache;
}
