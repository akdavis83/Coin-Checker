# Crypto Balance Checker

A tool to fetch Bitcoin and Ethereum balances using public APIs. This project includes two implementations:

1. **Console-Based Checker**: A Node.js script to check balances in the command line.
2. **HTML-Based Checker**: A web page to check balances in the browser.

---

## 1. Console-Based Checker (Node.js)

### Description
This version uses Node.js to fetch Bitcoin and Ethereum balances from public APIs and displays them in the terminal.

### Prerequisites
- **Node.js**: Download and install [Node.js](https://nodejs.org).
- **npm (Node Package Manager)**: Included with Node.js.
- **Etherscan API Key**: Get a free API key from [Etherscan](https://etherscan.io/apis).

### Setup and Installation
1. **Create a Project Directory**  
   Create a folder for your project (e.g., `check`).

2. **Navigate to the Directory**  
   Open a terminal and navigate to the folder:
   ```bash
   cd check
Initialize the Project
Create a package.json file:

bash
Copy
Edit
npm init -y
Install Dependencies
Install the required packages:

bash
Copy
Edit
npm install node-fetch bitcoin-address-validation ethers
Create the Script
Create a new file, balanceChecker.js, and copy the following code:

javascript
Copy
Edit
const fetch = require('node-fetch');
const bitcoinAddress = require('bitcoin-address-validation');
const { ethers } = require("ethers");

async function getBitcoinBalance(address) {
    if (!bitcoinAddress.validate(address)) {
        console.error("Invalid Bitcoin address.");
        return null;
    }
    const apiUrl = `https://blockchain.info/balance?active=${address}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const balanceBTC = data[address].final_balance / 100000000;
        return balanceBTC;
    } catch (error) {
        console.error("Error fetching Bitcoin balance:", error);
        return null;
    }
}

async function getEthereumBalance(address) {
    if (!ethers.isAddress(address)) {
        console.error("Invalid Ethereum address.");
        return null;
    }
    const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YOUR_ETHERSCAN_API_KEY`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.status === "1") {
            const balanceEth = ethers.formatEther(data.result);
            return balanceEth;
        } else {
            throw new Error(`Error from Etherscan API: ${data.message}`);
        }
    } catch (error) {
        console.error("Error fetching Ethereum balance:", error);
        return null;
    }
}

async function main() {
    const btcAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Example BTC Address
    const ethAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Example ETH Address

    console.log("Checking BTC Balance...");
    const btcBalance = await getBitcoinBalance(btcAddress);
    if (btcBalance !== null) console.log(`Bitcoin Balance: ${btcBalance} BTC`);

    console.log("Checking ETH Balance...");
    const ethBalance = await getEthereumBalance(ethAddress);
    if (ethBalance !== null) console.log(`Ethereum Balance: ${ethBalance} ETH`);
}

main();
Run the Script
Execute the script in the terminal:

bash
Copy
Edit
node balanceChecker.js
Expected Output
Example output for the given addresses:

yaml
Copy
Edit
Checking BTC Balance...
Bitcoin Balance: 68.84922675 BTC
Checking ETH Balance...
Ethereum Balance: 793.527040349318671037 ETH
2. HTML-Based Checker (Web Browser)
Description
This version provides a web page with input fields to enter Bitcoin and Ethereum addresses. It fetches balances and displays them directly on the page.

Prerequisites
Web Browser: Any modern browser (Chrome, Firefox, Safari, etc.).
Etherscan API Key: Get a free API key from Etherscan.
Internet Connection: Required for API calls.
Setup and Installation
Create an HTML File
Create a file named balance.html and copy the following code:

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Balance Checker</title>
    <style>
        body { font-family: sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        input, button { width: 100%; margin-bottom: 10px; padding: 10px; border-radius: 4px; }
        button { background: #007bff; color: white; border: none; cursor: pointer; }
        button:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Crypto Balance Checker</h1>
        <label for="btcAddress">Bitcoin Address:</label>
        <input id="btcAddress" type="text" placeholder="Enter BTC Address">
        <div id="btcResult"></div>
        <label for="ethAddress">Ethereum Address:</label>
        <input id="ethAddress" type="text" placeholder="Enter ETH Address">
        <div id="ethResult"></div>
        <button onclick="checkBalances()">Check Balances</button>
    </div>
    <script>
        async function fetchBalance(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return await response.json();
            } catch (error) {
                return { error: error.message };
            }
        }
        async function checkBalances() {
            const btcAddress = document.getElementById("btcAddress").value;
            const ethAddress = document.getElementById("ethAddress").value;
            const btcResult = await fetchBalance(`https://blockchain.info/balance?active=${btcAddress}`);
            document.getElementById("btcResult").textContent = btcResult.error || `BTC Balance: ${btcResult[btcAddress]?.final_balance / 1e8} BTC`;
            const ethResult = await fetchBalance(`https://api.etherscan.io/api?module=account&action=balance&address=${ethAddress}&apikey=YOUR_ETHERSCAN_API_KEY`);
            document.getElementById("ethResult").textContent = ethResult.error || `ETH Balance: ${ethResult.result / 1e18} ETH`;
        }
    </script>
</body>
</html>
Open in Browser
Open the balance.html file in your web browser.

Check Balances
Enter Bitcoin and Ethereum addresses and click the "Check Balances" button.

Expected Output
The balances for the provided addresses will be displayed below their respective input fields.

Usage Notes
Replace YOUR_ETHERSCAN_API_KEY in the scripts with your actual API key.
Modify the styling in the HTML file to customize the page's appearance.
Be mindful of API rate limits.
