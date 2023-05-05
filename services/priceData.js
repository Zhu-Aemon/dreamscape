const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

async function readCSVFile(stockName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join('D:\\StockData', `${stockName}.csv`);
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });

}

module.exports = {
  readCSVFile,
};
