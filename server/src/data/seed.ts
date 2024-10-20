import { ObjectId } from "mongodb";
import { CurrencyDataEntry, TradeData } from "../typedef/typedef";
import fs from 'fs';
import csv from 'csv-parser';
import { getData } from "../config/mongoCollections";
interface CsvRow {
  [key: string]: string; // Define the structure of the CSV rows, using a dynamic key-value pair
}


const insertData = async (league: string, division: string): Promise<void> => {
    const csvCurrencyData: CsvRow[] = await readCsvFile(`./../../resources/${league}/${division} ${league}.currency.csv`)
    const currencyData: TradeData = {
        league: league,
        division: division,
        data: []
    }
    for(let i = 0; i < csvCurrencyData.length; i++){
        const fields: string[] = csvCurrencyData[i]
            [Object.keys(csvCurrencyData[i])[0]].split(";");
        currencyData.data.push({
            date: fields[1],
            offerCurrency: fields[3],
            amount: parseFloat(fields[4]),
            confidence: fields[5]
        })
    }
    const dataCollection = await getData();
    const exists = await dataCollection.findOne({
        league: league,
        division: division
    });
    if(exists){
        const result = await dataCollection.replaceOne(
            {league: league, division: division},
            currencyData
        )
        console.log(`${result.matchedCount > 0 ? "Successfully updated" : "Failed to update"} data for ${league} ${division}`)
        return;
    } 

    const result = await dataCollection.insertOne(currencyData);
    console.log(`${result.acknowledged ? "Successfully inserted" : "Failed to insert"} data for ${league} ${division}`)
}

const getAllData = async(): Promise<any[]> => {
    const dataCollection = await getData();
    return await dataCollection.find({}).toArray();
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
    //console.log((await readCsvFile("../../resources/Necropolis/Necropolis.currency.csv")).slice(0, 10))
    //insertData("Necropolis", "Hardcore")
    console.log(await getAllData());
};

main()