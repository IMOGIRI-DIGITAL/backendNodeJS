interface Transactions {
    transactionId: string;
    transactionDate: Date;
    transactionTourGuide: any[];
    transactionTotalPerson: number;
    transactionTotalPrice: number;
    transactionMethod: any[];
    transactionCardName: string;
    transactionCardNumber: string;
    tourRef: any[];
    packageId: string;
    tourDate: Date;
    userId: string;
    transactionDetails: any[]
    idKTP: number;
}

interface createTansaction {
    transactionId: string;
    transactionTotalPerson: number;
    transactionTotalPrice: number;
    transactionMethod: any[];
    transactionCardName: string;
    transactionCardNumber: string;
    packageId: string;
    userId: string;
    idKTP: number;
}