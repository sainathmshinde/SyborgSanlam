// const relatedDocuments = [
//   "Registration Certificate",
//   "Incorporation Letter",
//   "Last 3 Months Statement",
//   "Account Verification Letter",
//   "Passport",
//   "Driver's License",
//   "National ID",
//   "Electricity Bill",
//   "Tax Bill",
//   "Rental Agreement",
//   "Partnership Contract",
//   "Partner Identification Proof",
//   "Trust Deed",
//   "Trust Registration Certificate",
//   "Trustee Identification Proof",
// ];

const relatedDocuments = {
  Certificate: ["Registration Certificate", "Incorporation Letter"],
  IdProof: ["Passport", "Driver's License", "National ID"],
  AddressProof: ["Electricity Bill", "Tax Bill", "Rental Agreement"],
  BankStatement: ["Last 3 Months Statement", "Account Verification Letter"],
  PartnershipAgreement: ["Partnership Contract"],
  PartnerIds: ["Partner Identification Proof"],
  TrustRegistrationCertificate: ["Trust Deed", "Registration Certificate"],
  TrusteeIds: ["Trustee Identification Proof"],
};

// Generate a single array of all related documents
//   const allDocuments = Object.values(relatedDocuments).flat();

export const allDocuments = relatedDocuments;
