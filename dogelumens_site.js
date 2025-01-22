

function updateCountdown() {
    const targetDate = new Date('2025-03-01T00:00:00');
    const now = new Date();
    const timeDifference = targetDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeDifference < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "Time's up!";
    }
}


function fetchCryptoPrices() {
    // Fetch Bitcoin price
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            var btcprice = data.bitcoin.usd;
            document.getElementById('bitcoin-price').innerHTML = `1 Bitcoin = $${btcprice.toFixed(2)}`;
            checkWhoIsWinning(btcprice)
        })
        .catch(error => {
            document.getElementById('bitcoin-price').innerHTML = "Error fetching Bitcoin price.";
        });

    // Fetch Dogelumen price
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=doge-lumens&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data.dogelumen.usd;
            const totalValue = (100000 * price).toFixed(2);
            document.getElementById('dogelumens-price').innerHTML = `Current Dogelumen Price: $${price.toFixed(4)}<br>Total for 100,000 Dogelumens: $${totalValue}`;
        })
        .catch(error => {
            document.getElementById('dogelumens-price').innerHTML = `100k DXLM = $27.5`;
        });
}

function checkWhoIsWinning(price){
    if(price > 75000) {
        console.log(price);
        console.log("Hello world!");
        document.getElementById('whoiswinning').innerHTML = "Zbychu is winning";
    }
    else {
        console.log(price);
        //console.log("Hello world!");
        document.getElementById('whoiswinning').innerHTML = "Krzychu is winning";
    }
}


const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call
fetchCryptoPrices(); // Fetch the cryptocurrency prices
checkWhoIsWinning();