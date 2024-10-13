import {ObjectId} from "mongodb";

export type User = {
    _id: string | ObjectId,
    username: string,
    email: string,
    password?: string
}

export interface CurrencyDataEntry {
    date: string,
    offerCurrency: string,
    amount: number,
    confidence?: string
}

export interface CurrencyData {
    league: string,
    division: string,
    data: CurrencyDataEntry[]
}