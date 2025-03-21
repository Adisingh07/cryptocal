 // Function to fetch live prices
 function fetchPrices() {
     fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,dogecoin&vs_currencies=usd")
         .then(response => response.json())
         .then(data => {
             document.getElementById("btc-price").innerText = `$${data.bitcoin.usd}`;
             document.getElementById("eth-price").innerText = `$${data.ethereum.usd}`;
             document.getElementById("ltc-price").innerText = `$${data.litecoin.usd}`;
             document.getElementById("doge-price").innerText = `$${data.dogecoin.usd}`;
         })
         .catch(error => console.error("Error fetching prices:", error));
 }
 
 // Function to toggle between Auto and Manual Update
 function toggleUpdateMode() {
     let autoUpdate = document.querySelector('input[name="update-mode"]:checked').value;
     let refreshButton = document.getElementById("refresh-prices");
 
     if (autoUpdate === "auto") {
         refreshButton.style.display = "none";  // Hide manual button
         fetchPrices();  // Fetch once immediately
         startAutoUpdate();
     } else {
         refreshButton.style.display = "block"; // Show manual button
         stopAutoUpdate();
     }
 }
 
 // Auto update function (updates every 10 seconds)
 let priceInterval;
 function startAutoUpdate() {
     stopAutoUpdate();  // Stop any existing interval
     priceInterval = setInterval(fetchPrices, 10000); // 10 seconds update
 }
 
 // Stop auto update
 function stopAutoUpdate() {
     clearInterval(priceInterval);
 }
 
 // Initialize prices on page load
 document.addEventListener("DOMContentLoaded", () => {
     fetchPrices();
     startAutoUpdate();
 });
        
         


 document.addEventListener("DOMContentLoaded", function () {
 const sidebar = document.querySelector(".sidebar");
     const toggleBtn = document.querySelector(".sidebar-toggle");
     const mainContent = document.querySelector(".main-content");
 
     toggleBtn.addEventListener("click", function () {
         sidebar.classList.toggle("active");
         mainContent.classList.toggle("shifted");
     });
 });
