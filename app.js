const express = require("express");
const cors = require("cors");
const stockService = require('./services/priceData')

const app = express();
app.use(express.json()); // for parsing JSON data in request bodies
app.use(cors()); // enable CORS for all routes

const server = require("http").createServer(app);

app.get('/stock', async (req, res) => {
  const { name } = req.query;

  try {
    const data = await stockService.readCSVFile(name);
    res.json(data);
  } catch (error) {
    console.error(`Error reading CSV file: ${error.message}`);
    res.status(500).json({ error: 'Error reading CSV file' });
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
