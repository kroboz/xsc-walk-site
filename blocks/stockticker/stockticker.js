var searchSymbols = document.getElementsByClassName("stockticker")[0].innerHTML

var searchSymbol = searchSymbols.replace(/<div>|<\/div>/g, '');

var stockSymbol = searchSymbol.match(/\S+/g);

if (stockSymbol[1] === undefined){

      // Do not display anything.
      document.getElementById('stock-price-information').textContent = 'Nothing to show.';
      document.getElementById('stock-price').textContent = '';
      document.getElementById('high-price').textContent = '';
      document.getElementById('low-price').textContent = '';
      document.getElementById('trade-date').textContent = '';
}
else {
// Make an HTTP request to the Alpha Vantage API
// fetch ('http://127.0.0.1:5500/css/stock-price.json')
fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+stockSymbol[1]+'&apikey=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => {
    // Extract the stock price ticker
    const stockTicker = data['Global Quote']['01. symbol'];
    
    // Extract the stock price from the API response
    const stockPrice = data['Global Quote']['05. price'];

    // Extract the high price
    const highPrice = data['Global Quote']['03. high'];

    // Extract the low price
    const lowPrice = data['Global Quote']['04. low'];

    // Extract the trade date
    const tradeDate = data['Global Quote']['07. latest trading day'];
   
    // Display title
    document.getElementById('stock-price-information').textContent = 'Stock Price Information (dynamically generated): ' ;

    // Display the stock price
    document.getElementById('stock-price').textContent = stockTicker + ': ' + stockPrice;

    // Display the high price
    document.getElementById('high-price').textContent = 'High Price: ' + highPrice;

     // Display the low price
     document.getElementById('low-price').textContent = 'Low Price: ' + lowPrice;

      // Display the last trade date
    document.getElementById('trade-date').textContent = 'Trade Date: ' + tradeDate;

  })
  .catch(error => {
    console.log('Error fetching stock price:', error);
  });
}

//  fetch ('http://127.0.0.1:5500/css/stock-price.json')
//  alert (stockSymbol[1])
//  fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=ADBE&apikey=YOUR_API_KEY')
