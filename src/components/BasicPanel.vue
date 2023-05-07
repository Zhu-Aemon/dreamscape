<!--suppress JSUnresolvedReference -->
<template>
  <div class="text-2xl ml-8 font-bold">
    {{ currentStock }}
  </div>
  <div class="mt-2 ml-2 mr-2 bg-white border-gray-100 border-2 rounded-[30px] shadow-xl">
    <div ref="chartContainer">
    </div>
  </div>
  <div class="flex p-10">
    <div class="px-5">
      <div class="flex">
        <h1 class="text-black font-medium text-xl p-1" @click="displayMetaQuery">Stocks</h1>
        <div class="ml-1 p-1 cursor-pointer hover:bg-gray-100 hover:rounded-lg">
          <i class="fa-solid fa-plus fa-lg" @click="addStock"></i>
        </div>
        <div
          v-show="showStockAddPopup"
          class="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center shadow-lg"
        >
          <div
            class="bg-gray-50 border-gray-700 w-1/2 max-h-96 mx-auto rounded-[20px] shadow-2xl p-6 overflow-y-auto custom-scrollbar"
          >
            <p class="font-bold text-2xl">Add Stock</p>
              <div class="relative py-2">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                       stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input type="search" id="default-search"
                       class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="Search" required
                       @keyup.enter="searchStock($event.target.value)"
                >
              </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  v-for="(stock, index) in resultList"
              >
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white select-none">
                  {{ stock['1. symbol'] }}
                </th>
                <td class="px-6 py-4">
                  {{ stock['2. name'] }}
                </td>
                <td class="px-6 py-4">
                  {{ stock['3. type'] }}
                </td>
                <td class="px-6 py-4">
                  {{ stock['4. region'] }}
                </td>
                <td class="px-6 py-4">
                  <div class="ml-1 p-1 cursor-pointer hover:bg-gray-100 hover:rounded-lg">
                    <i class="fa-solid fa-plus fa-lg" @click="addSelectedStock(stock['1. symbol'])"></i>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <button
              class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              @click="closeStockAddPopup"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div class="relative overflow-x-auto max-h-96 shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Stock
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Change
            </th>
            <th scope="col" class="px-6 py-3">
              Change(%)
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              v-for="(item, index) in stockList"
          >
            <td class="w-4 p-4" v-if="stockMetadata[item]">
              <div class="flex items-center">
                <input id="checkbox-table-1" type="checkbox"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer select-none"
                @dblclick="showStockData(item)"
                v-if="stockMetadata[item]"
            >
              {{ item }}
            </th>
            <td class="px-6 py-4" v-if="stockMetadata[item]">
              {{ stockMetadata[item].latestPrice}}
            </td>
            <td class="px-6 py-4" v-if="stockMetadata[item]">
              {{ stockMetadata[item].priceChange}}
            </td>
            <td class="px-6 py-4" v-if="stockMetadata[item]">
              {{ stockMetadata[item].priceChangeRatio}}%
            </td>
            <td class="px-6 py-4" v-if="stockMetadata[item]">
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                 @click="deleteThisStock(item)">Delete</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5">
      <h1 class="text-black font-medium text-xl p-1">Strategies Backtest</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Strategy name
            </th>
            <th scope="col" class="px-6 py-3">
              Win Rate
            </th>
            <th scope="col" class="px-6 py-3">
              Profit Rate
            </th>
            <th scope="col" class="px-6 py-3">
              Max Drawback
            </th>
            <th scope="col" class="px-6 py-3">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input id="checkbox-table-1" type="checkbox"
                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Apple MacBook Pro 17"
            </th>
            <td class="px-6 py-4">
              Silver
            </td>
            <td class="px-6 py-4">
              Laptop
            </td>
            <td class="px-6 py-4">
              $2999
            </td>
            <td class="px-6 py-4">
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit
                Strategy</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {onMounted, onUnmounted, ref, computed} from "vue";
import {useStore} from "vuex";
import {createChart} from "lightweight-charts";
import * as LightweightCharts from "lightweight-charts";

const store = useStore()

let chart
let candleSeries

const chartContainer = ref()
const currentStock = ref()
const stockMetadata = ref({})
const resultList = ref([])
const candleStickData = ref([])
const showStockAddPopup = ref(false)

const stockList = computed(() => store.state.stockList)

const API_KEY = import.meta.env.ALPHA_API_KEY

onMounted(async () => {
    await displayMetaQuery()
    const chartOptions = {
        layout: {
            textColor: 'black',
            background: {
                type: 'solid',
                color: 'white'
            }
        },
        height: 700,
        width: 1400,
    };
    chart = createChart(chartContainer.value, chartOptions)
    candleSeries = chart.addCandlestickSeries({
        upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    })

    candleSeries.setData(candleStickData.value);

    // Customizing the Crosshair
    chart.applyOptions({
        crosshair: {
            // Change mode from default 'magnet' to 'normal'.
            // Allows the crosshair to move freely without snapping to datapoints
            mode: LightweightCharts.CrosshairMode.Normal,

            // Vertical crosshair line (showing Date in Label)
            vertLine: {
                width: 8,
                color: '#C3BCDB44',
                style: LightweightCharts.LineStyle.Solid,
                labelBackgroundColor: '#9B7DFF',
            },

            // Horizontal crosshair line (showing Price in Label)
            horzLine: {
                color: '#9B7DFF',
                labelBackgroundColor: '#9B7DFF',
            },
        },
    });

    chart.timeScale().applyOptions({
        barSpacing: 2,
    })
    chart.timeScale().fitContent()

    await showStockData('AAPL')
})

onUnmounted(() => {
    if (chart) {
        chart.remove();
        chart = null;
    }
});

const getStockData = async (stock) => {
    const response = await axios.get(`http://localhost:3001/stock?name=${stock}`)
    // console.log(response.data)
    return response.data
}

const showStockData = async (symbol) => {
    currentStock.value = symbol
    candleStickData.value = await getStockData(symbol)
    // candleStickData.value.reverse()
    candleSeries.setData(candleStickData.value)
}

const addStock = () => {
    showStockAddPopup.value = true
    document.body.classList.add('overflow-hidden')
}

const closeStockAddPopup = () => {
    showStockAddPopup.value = false
    resultList.value = []
    document.body.classList.remove('overflow-hidden')
}

const searchStock = async (stock) => {
    const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=${API_KEY}`)
    resultList.value = response.data.bestMatches
    // console.log(resultList.value)
}

const addSelectedStock = async (stock) => {
    // console.log(stock)
    store.commit('updateStockList', [stock])
    await showStockData(stock)
    await displayMetaQuery()
    console.log(stockMetadata.value)
}

const deleteThisStock = (stock) => {
    store.commit('modifyStockList', stock)
}

const getPriceChangeRatio = async (symbol) => {
    const response = await axios.get(`http://localhost:3001/change?name=${symbol}`)
    // console.log(response.data)
    // console.log(response.data['latestPrice'])
    return response.data
}

const displayMetaQuery = async () => {
    const requests = stockList.value.map(async (stock) => {
        const data = await getPriceChangeRatio(stock);
        // console.log(data)
        if (data) {
            stockMetadata.value[stock] = data;
        }
    });

    await Promise.all(requests);
    // console.log('Price change data:', stockMetadata.value);
};

</script>
