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

export interface TradeData {
    league: string,
    division: string,
    currencyData: CurrencyData
}

export interface CurrencyData {
    [key: string]: CurrencyDataEntry[]
}

export interface ItemDataEntry {
    date: string,

}