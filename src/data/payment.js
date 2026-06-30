export const mpesaPaybill = {
  paybillNumber: "522533",
  accountNumber: "7889774",
  accountName: "Momentum Auto Spares",
};

export const mpesaSteps = [
  "Open M-Pesa on your phone",
  "Select Lipa na M-Pesa",
  "Choose Pay Bill",
  `Enter Business No. ${mpesaPaybill.paybillNumber}`,
  `Enter Account No. ${mpesaPaybill.accountNumber}`,
  "Enter the exact order total as the amount",
  "Enter your M-Pesa PIN to confirm",
];

export { storePhoneTel as supportPhone, storeWhatsApp as supportWhatsApp } from "./business";
