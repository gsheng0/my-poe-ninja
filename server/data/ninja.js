const constants = require("./../config/constants.js");

const constructUrl = (currencyCategory) => {
    let categoryType = "item";
    if(currencyCategory === "Currency" || currencyCategory === "Fragment") {
        categoryType = "currency";
    } 
    return `${constants.POE_NINJA_BASE_URL}${categoryType}overview?league=${constants.CURRENT_LEAGUE}&type=${currencyCategory}`;
}

const getTradeDataByCategory = async(currencyCategory) => {
    return (await (await fetch(constructUrl(currencyCategory))).json()).lines;
}

const main = async() => {
    const data = await getTradeDataByCategory("Currency");

    console.log(data);
}
main();