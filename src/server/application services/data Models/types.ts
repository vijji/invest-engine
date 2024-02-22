/*
  Data model representing a single sector
 */
export type SectorModelEntity = {
    name: string
}
/*
  Data model representing a stock sector in database
 */
export type SectorEntity = {
    id: number,
    name: string
}
/*
  Data model representing a single stock and its current market price
 */
export type ModelStock = {
    id: string,
    name: string,
    currentPrice: number,
}

/*
  Data model representing list of stocks for a single sector
 */
export type listStocksBySector = {
    name: string,
    stock: ModelStock[],
}

/*
  Data model to hold stock ticker, url from where data is pulled, external/vendor site name.
 */
export type listAllStocksByAVendor = {
    vendorName: string,
    stockDetails: [{
        stockId: string,
        url: string,
    }]
}

/*
  Data model to hold stock ticker, url from where data is pulled, external/vendor site name.
 */
export type listStocksPerformedByOneAndThreeYearMark = {
    stockName: string,
    sectorName: string,
    currentMarketValue: string,
    priceHistory: {
        ytd: bigint,
        oneYear: bigint,
        threeYear: bigint,
    }
    volumeHistory: {
        oneMonthTraded: bigint,
        oneMonthDelivery: bigint,
    }
}