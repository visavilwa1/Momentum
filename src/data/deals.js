import { products } from "./products";

// Sale ends Sunday night — update this date to extend/restart the sale
export const SALE_END = new Date("2026-06-14T23:59:59");

// SKU → discounted price (original price is the regular product price)
const DEAL_OVERRIDES = {
  "KD2764":        { salePrice: 560,  label: "30% OFF" },
  "KD2780":        { salePrice: 560,  label: "30% OFF" },
  "KD1740":        { salePrice: 560,  label: "30% OFF" },
  "KD2701":        { salePrice: 525,  label: "30% OFF" },
  "CVT-GREEN2":    { salePrice: 1440, label: "20% OFF" },
  "SP5W-30":       { salePrice: 1440, label: "20% OFF" },
  "BKR6EIX-6418":  { salePrice: 750,  label: "25% OFF" },
  "90915-YZZE1":   { salePrice: 100,  label: "33% OFF" },
  "MILLBOS-HYB":   { salePrice: 175,  label: "30% OFF" },
  "VCG-1NZFE":     { salePrice: 175,  label: "30% OFF" },
  "SUBARU-CVT":    { salePrice: 1500, label: "25% OFF" },
  "KOITO-H4-12V":  { salePrice: 1050, label: "30% OFF" },
};

// Build deal products: originalPrice = regular price, price = sale price
export const dealProducts = products
  .filter((p) => DEAL_OVERRIDES[p.sku])
  .map((p) => ({
    ...p,
    originalPrice: p.price,
    price: DEAL_OVERRIDES[p.sku].salePrice,
    dealLabel: DEAL_OVERRIDES[p.sku].label,
    badge: "Hot Deal",
  }));
