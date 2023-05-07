const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const axios = require("axios");
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config()

const API_KEY = process.env.API_KEY
const db = new sqlite3.Database('stocks.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS stock_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  symbol TEXT,
  date TEXT,
  open REAL,
  high REAL,
  low REAL,
  close REAL,
  UNIQUE(symbol, date)
)`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Stock data table created or already exists.');
  }
});

function insertStockData(symbol, data) {
  const sql = `
    INSERT OR REPLACE INTO stock_data (symbol, date, open, high, low, close)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  data.forEach((record) => {
    const { time, open, high, low, close } = record;

    db.run(sql, [symbol, time, open, high, low, close], (err) => {
      if (err) {
        console.error('Error inserting/updating data:', err.message);
      }
    });
  });

  console.log('Stock data inserted/updated successfully.');
}

async function fetchStockData(symbol) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}&outputsize=full`;

  try {
    const response = await axios.get(url);
    const data = response.data['Time Series (Daily)'];

    // Process the data into the desired format
    return Object.entries(data).map(([date, values]) => ({
      time: date,
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
    }));
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
}

function fetchStockDataDB(symbol, callback) {
  const sql = 'SELECT date, open, high, low, close FROM stock_data WHERE symbol = ? ORDER BY date';

  db.all(sql, [symbol], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      callback([]);
    } else {
      const data = rows.map((row) => ({
        time: row.date,
        open: row.open,
        high: row.high,
        low: row.low,
        close: row.close,
      }));

      callback(data);
    }
  });
}

function getLatestPriceChange(stockSymbol) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT close, LAG(close) OVER (ORDER BY date) AS prev_close
      FROM stock_data
      WHERE symbol = ?
      ORDER BY date DESC
      LIMIT 1
    `;

    db.get(query, [stockSymbol], (err, row) => {
      if (err) {
        reject(err.message);
      } else if (row && row.prev_close) {
        const priceChangeRaw = row.close - row.prev_close;
        const priceChange = priceChangeRaw.toFixed(2)
        const priceChangeRatioRaw = (priceChange / row.prev_close) * 100;
        const priceChangeRatio = priceChangeRatioRaw.toFixed(2)
        // Include the latest close price in the resolved object
        resolve({ latestPrice: row.close, priceChange, priceChangeRatio });
      } else {
        resolve({ latestPrice: null, priceChange: null, priceChangeRatio: null });
      }
    });
  });
}

module.exports = {
  fetchStockData, fetchStockDataDB, insertStockData, getLatestPriceChange
};
