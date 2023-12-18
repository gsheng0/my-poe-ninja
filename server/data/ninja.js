const currencyUrl = "https://poe.ninja/api/data/currencyoverview?league=Affliction&type=Currency"

const getCurrencyData = async() => {
    return (await (await fetch(currencyUrl)).json()).lines;
}

const main = async() => {
    const data = await getCurrencyData();

    console.log(data);
}
main();