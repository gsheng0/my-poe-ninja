import { ObjectId } from "mongodb";
import { CurrencyDataEntry, CurrencyData } from "../typedef/typedef";
import fs from 'fs';
import csv from 'csv-parser';

interface CsvRow {
  [key: string]: string; // Define the structure of the CSV rows, using a dynamic key-value pair
}

const collections = require("./../config/mongoCollections.js");

const insertData = async (league: string, division: string): Promise<void> => {
    const csvCurrencyData: CsvRow[] = await readCsvFile(`./../resources/${league}/${division}${league}.currency.csv`)
    const currencyData: CurrencyData = {
        league: league,
        division: division,
        data: []
    }
    for(let i = 0; i < csvCurrencyData.length; i++){
        const fields: string[] = csvCurrencyData[i]['League;Date;Get;Pay;Value;Confidence'].split(";");
        currencyData.data.push({
            date: fields[1],
            offerCurrency: fields[3],
            amount: parseFloat(fields[4]),
            confidence: fields[5]
        })
    }

}

const readCsvFile = (filePath: string): Promise<CsvRow[]> => {
    const results: CsvRow[] = [];
    const stream = fs.createReadStream(filePath).pipe(csv());

    return new Promise((resolve, reject) => {
        stream.on('data', (data: CsvRow) => results.push(data));
        stream.on('end', () => resolve(results));
        stream.on('error', (error) => reject(error));
    });
};

const main = async (): Promise<void> => {
    console.log((await readCsvFile("../../resources/Necropolis/Necropolis.currency.csv")).slice(0, 10))
};

main()