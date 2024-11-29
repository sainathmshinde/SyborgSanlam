const relatedDocuments = {
  certificateOfIncorporation: [
    "Registration Certificate",
    "Incorporation Letter",
  ],
  bankStatement: ["Last 3 Months Statement", "Account Verification Letter"],
  idProof: ["Passport", "Driver's License", "National ID"],
  addressProof: ["Electricity Bill", "Tax Bill", "Rental Agreement"],
  partnershipAgreement: ["Partnership Contract"],
  partnerIds: ["Partner Identification Proof"],
  trustRegistrationCertificate: ["Trust Deed", "Registration Certificate"],
  trusteeIds: ["Trustee Identification Proof"],
};

// Generate a single array of all related documents
//   const allDocuments = Object.values(relatedDocuments).flat();

export const allDocuments = Object.values(relatedDocuments).flat();
