const constants = require("./../config/constants.js");

const constructUrl = (currencyCategory) => {
    let categoryType = "item";
    if(currencyCategory === "Currency" || currencyCategory === "Fragment") {
        categoryType = "currency";
    } 
    return `${constants.POE_NINJA_BASE_URL}${categoryType}overview?league=${constants.CURRENT_LEAGUE}&type=${currencyCategory}`;
}

const getCurrencyIdMap = async() => {
    const data = (await (await fetch(constructUrl("Currency"))).json()).currencyDetails;
    const output = {};
    for(let i = 0; i < data.length; i++){
        const current = data[i];
        output[current.id] = {
            icon: current.icon,
            name: current.name,
            tradeId: current.tradeId
        }
    }
    return output;
}

const getTradeDataByCategory = async(currencyCategory) => {
    return (await (await fetch(constructUrl(currencyCategory))).json()).lines;
}

const main = async() => {
    // const data = await getTradeDataByCategory("Currency");

    // console.log(data);
    console.log(await getCurrencyIdMap());
}
main();