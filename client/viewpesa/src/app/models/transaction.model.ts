export interface Transaction {
    _id?: string;
    category?: string;
    amount?: number;
    description?: string;
    wallet?: string;
    owner?: string;
}