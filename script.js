// Map UI dropdown values to CoinGecko API IDs
const cryptoMap = {
    pi: "PI",  // Pi is unavailable; using Bitcoin as a placeholder
    btc: "bitcoin",
    eth: "ethereum",
    ltc: "litecoin",
    doge: "dogecoin"
};

const currencyMap = {
    usd: "usd",
    inr: "inr",
    eur: "eur",
    gbp: "gbp",
    jpy: "jpy"
};

// Fetch Live Crypto Price
async function fetchPrice() {
    const cryptoSelect = document.getElementById("crypto-select").value;
    const currencySelect = document.getElementById("currency-select").value;

    const cryptoID = cryptoMap[cryptoSelect];  // Get correct CoinGecko ID
    const currencyID = currencyMap[currencySelect];

    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoID}&vs_currencies=${currencyID}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const price = data[cryptoID][currencyID];

        document.getElementById("live-price").innerText = `Live Price: ${price} ${currencyID.toUpperCase()}`;
        document.getElementById("live-price").dataset.price = price;  // Store price for calculation
    } catch (error) {
        console.error("Error fetching live price:", error);
        document.getElementById("live-price").innerText = "Live Price: Error fetching data";
    }
}

// Calculate Total
function calculateTotal() {
    const amount = parseFloat(document.getElementById("amount").value);
    const priceMode = document.querySelector('input[name="price-mode"]:checked').value;
    let price;

    if (priceMode === "manual") {
        price = parseFloat(document.getElementById("manual-price").value);
    } else {
        price = parseFloat(document.getElementById("live-price").dataset.price);
    }

    if (!isNaN(amount) && !isNaN(price)) {
        const total = amount * price;
        document.getElementById("total-price").innerText = `Total: ${total.toFixed(2)} ${document.getElementById("currency-select").value.toUpperCase()}`;
    } else {
        alert("Please enter valid values!");
    }
}

// Event Listeners
document.getElementById("crypto-select").addEventListener("change", fetchPrice);
document.getElementById("currency-select").addEventListener("change", fetchPrice);
document.addEventListener("DOMContentLoaded", fetchPrice);  // Fetch price on page load

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const mainContent = document.querySelector(".main-content");

    toggleBtn.addEventListener("click", function () {
        sidebar.classList.toggle("active");
        mainContent.classList.toggle("shifted");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const autoRadio = document.querySelector("input[value='auto']");
    const manualRadio = document.querySelector("input[value='manual']");
    const manualPriceInput = document.getElementById("manual-price");
    const livePriceText = document.getElementById("live-price");

    function togglePriceInput() {
        if (manualRadio.checked) {
            manualPriceInput.style.display = "block";
            livePriceText.style.display = "none";
        } else {
            manualPriceInput.style.display = "none";
            livePriceText.style.display = "block";
        }
    }

    // Add event listeners for the radio buttons
    autoRadio.addEventListener("change", togglePriceInput);
    manualRadio.addEventListener("change", togglePriceInput);

    // Initial call to set correct state
    togglePriceInput();
});
