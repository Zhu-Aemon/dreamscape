const express = require("express");
const cors = require("cors");
const { fetchStockData, fetchStockDataDB, insertStockData, getLatestPriceChange } = require('./services/priceData')

const app = express();
app.use(express.json()); // for parsing JSON data in request bodies
app.use(cors()); // enable CORS for all routes

const server = require("http").createServer(app);

app.get('/stock', (req, res) => {
  const symbol = req.query.name;

  // Check if the data exists in the database
  fetchStockDataDB(symbol, (data) => {
    if (data.length > 0) {
      // Data found in the database, send it to the frontend
      res.json(data);
    } else {
      // Data not found in the database, fetch it from Alpha Vantage
      fetchStockData(symbol).then((fetchedData) => {
        if (fetchedData.length > 0) {
          // Store the fetched data in the database
          insertStockData(symbol, fetchedData);

          // Send the fetched data to the frontend
          res.json(fetchedData);
        } else {
          res.status(404).json({ error: 'Stock data not found' });
        }
      }).catch((err) => {
        console.error('Error fetching stock data:', err.message);
        res.status(500).json({ error: 'Error fetching stock data' });
      });
    }
  });
});

app.get('/change', (req, res) => {
  const symbol = req.query.name
  getLatestPriceChange(symbol).then((response) => {
    // console.log(response)
    res.json(response)
  })
      .catch((err) => {
        console.log(err)
      })
})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
