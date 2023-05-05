<template>
  <div class="flex p-10">
    <div class="px-5">
      <h1 class="text-black font-medium text-xl p-2">Stocks</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              Stock
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Category
            </th>
            <th scope="col" class="px-6 py-3">
              Change
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
                <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" @click="getStockData">Show</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="px-5">
      <h1 class="text-black font-medium text-xl py-2">Strategies</h1>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
                <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
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
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">Edit Strategy</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <canvas id="myChart"></canvas>
</template>

<script setup>
import axios from "axios";
import { OhlcElement, OhlcController, CandlestickElement, CandlestickController } from 'chartjs-chart-financial'
import Chart from 'chart.js/auto' // Easy way of importing everything
import 'chartjs-adapter-date-fns';
import { onMounted, ref, shallowRef } from "vue";

const chart = shallowRef(null)

onMounted(() => {
  Chart.register(OhlcElement, OhlcController, CandlestickElement, CandlestickController)
})

const getStockData = async (stock) => {
  const response = await axios.get(`http://localhost:3001/stock?name=AAPL`)
  const data = response.data
}

</script>
