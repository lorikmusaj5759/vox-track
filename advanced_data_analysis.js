/*
Filename: advanced_data_analysis.js

Description: This code performs advanced data analysis on a dataset of sales transactions.

Note: This code assumes the presence of the 'lodash' library for various data manipulation tasks.

*/

// Helper function to generate random sales data
function generateRandomSalesData(numTransactions) {
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const stores = ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5'];

  const transactions = [];
  for (let i = 0; i < numTransactions; i++) {
    const date = randomDate(new Date(2020, 0, 1), new Date());
    const product = _.sample(products);
    const store = _.sample(stores);
    const quantity = _.random(1, 10);
    const revenue = _.random(10, 100) * quantity;

    transactions.push({
      date,
      product,
      store,
      quantity,
      revenue,
    });
  }

  return transactions;
}

// Helper function to generate a random date within a range
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Generate random sales data
const salesData = generateRandomSalesData(1000);

// Calculate total revenue
const totalRevenue = _.sumBy(salesData, 'revenue');

// Group transactions by stores
const transactionsByStore = _.groupBy(salesData, 'store');
const storesWithMostSales = _.keys(transactionsByStore).filter(store => {
  const storeSales = transactionsByStore[store];
  const totalSales = _.sumBy(storeSales, 'revenue');
  return totalSales > totalRevenue / 2;
});

// Group transactions by products
const transactionsByProduct = _.groupBy(salesData, 'product');
const topSellingProducts = _.map(transactionsByProduct, (productSales, product) => {
  const totalSales = _.sumBy(productSales, 'revenue');
  return { product, totalSales };
}).sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

// Calculate average revenue per transaction
const averageRevenuePerTransaction = totalRevenue / salesData.length;

// Calculate revenue growth compared to the previous month
const currentMonthRevenue = _.filter(salesData, transaction => {
  const currentMonth = new Date().getMonth();
  return transaction.date.getMonth() === currentMonth;
});
const previousMonthRevenue = _.filter(salesData, transaction => {
  const previousMonth = new Date().getMonth() - 1;
  return transaction.date.getMonth() === previousMonth;
});
const revenueGrowth = (_.sumBy(currentMonthRevenue, 'revenue') - _.sumBy(previousMonthRevenue, 'revenue')) / _.sumBy(previousMonthRevenue, 'revenue');

// Print analysis results
console.log('----- Sales Data Analysis -----');
console.log('Total Revenue:', totalRevenue.toFixed(2));
console.log('Stores with Most Sales:', storesWithMostSales);
console.log('Top Selling Products:', topSellingProducts);
console.log('Average Revenue per Transaction:', averageRevenuePerTransaction.toFixed(2));
console.log('Revenue Growth:', (revenueGrowth * 100).toFixed(2) + '%');

// ... Additional complex data analysis logic goes here ...

// End of code