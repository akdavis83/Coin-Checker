1. Console-Based Checker (Node.js)
Description
This version uses Node.js to fetch Bitcoin and Ethereum balances from public APIs and displays them in the command-line console.

Prerequisites
Node.js: You must have Node.js installed on your system. Download from https://nodejs.org.

npm (Node Package Manager): npm is included with Node.js.

Etherscan API Key: You will need a free API key from Etherscan to get ETH balances. Get yours here https://etherscan.io/apis

Setup and Installation
Create a Project Directory:

Create a new folder on your computer to store your project (e.g., crypto-checker).

Navigate to Directory:

Open your terminal or command prompt and navigate to the project directory:

cd check

Bash
Create a package.json file:
bash npm init -y

Install Dependencies:

Install the required packages using npm:

npm install node-fetch bitcoin-address-validation ethers

Bash
Create JavaScript File:

Create a new file in the project directory (e.g., balanceChecker.js).

Copy and paste the following code into balanceChecker.js. Remember to replace "YOUR_ETHERSCAN_API_KEY" with the actual key from the Etherscan.

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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const balanceSatoshi = data[address].final_balance;
        const balanceBTC = balanceSatoshi / 100000000;
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
    const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YOUR_ETHERSCAN_API_KEY`; // Replace YOUR_ETHERSCAN_API_KEY with your Etherscan API Key
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "1") {
            const balanceWei = data.result;
            const balanceEth = ethers.formatEther(balanceWei);
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
    const ethAddress = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"; // Example ETH address

    console.log("Checking BTC Balance");
    const btcBalance = await getBitcoinBalance(btcAddress);
    if (btcBalance !== null) {
        console.log(`Bitcoin Balance: ${btcBalance} BTC`);
    }

    console.log("Checking ETH Balance");
    const ethBalance = await getEthereumBalance(ethAddress);
    if (ethBalance !== null) {
        console.log(`Ethereum Balance: ${ethBalance} ETH`);
    }
}

main();
Use code with caution.
JavaScript
Running the Console-Based Checker
Open Your Terminal: Open a terminal or command prompt in your project folder.

Execute the Script: Run the JavaScript file using Node.js:

node balanceChecker.js
Use code with caution.
Bash
Expected Output
The console will display the balances for the BTC and ETH addresses in the script. For example:

Checking BTC Balance
Bitcoin Balance: 68.84922675 BTC
Checking ETH Balance
Ethereum Balance: 793.527040349318671037 ETH
Use code with caution.
Note: Your balances will vary based on the addresses used and current blockchain state.

Usage Notes
Address Modification: Modify the btcAddress and ethAddress variables in the code to check the balances of different addresses.

Rate Limiting: Be mindful of API rate limits when making repeated requests.

2. HTML-Based Checker (Web Browser)
Description
This version provides a web page with input fields for entering BTC and ETH addresses and displays the balances on the page after you click the button.

Prerequisites
Web Browser: Any modern web browser (Chrome, Firefox, Safari, etc.).

Etherscan API Key: You will need a free API key from Etherscan to get ETH balances. Get yours here https://etherscan.io/apis

Internet Connection: An active internet connection to make API calls.

Setup and Installation
Create an HTML File:

Create a new file (e.g., balance.html) in the same directory as your Node.js script or a new directory if you wish.

Copy and paste the HTML code below into the balance.html file. Remember to replace "YOUR_ETHERSCAN_API_KEY" with the actual key from the Etherscan.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Balance Checker</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        label {
            display: block;
            margin-bottom: 5px;
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        .result {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Crypto Balance Checker</h1>
        <div>
            <label for="btcAddress">Bitcoin Address:</label>
            <input type="text" id="btcAddress" placeholder="Enter BTC Address">
            <div id="btcResult" class="result"></div>
        </div>
        <div>
            <label for="ethAddress">Ethereum Address:</label>
            <input type="text" id="ethAddress" placeholder="Enter ETH Address">
            <div id="ethResult" class="result"></div>
        </div>
        <button onclick="checkBalances()">Check Balances</button>
    </div>

    <script>
         // Function to validate Bitcoin addresses using the regex
       function isValidBitcoinAddress(address) {
          const btcRegex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;
          return btcRegex.test(address);
       }

       // Function to validate Ethereum Addresses
        function isValidEthereumAddress(address) {
            const ethRegex = /^0x[a-fA-F0-9]{40}$/;
            return ethRegex.test(address);
        }

        async function getBitcoinBalance(address) {
            if (!isValidBitcoinAddress(address)) {
                return "Invalid Bitcoin address.";
            }
            const apiUrl = `https://blockchain.info/balance?active=${address}`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                  const balanceSatoshi = data[address].final_balance;
                const balanceBTC = balanceSatoshi / 100000000;
                return `Bitcoin Balance: ${balanceBTC} BTC`;
            } catch (error) {
               return  "Error fetching Bitcoin balance: " + error;
            }
        }

        async function getEthereumBalance(address) {
            if (!isValidEthereumAddress(address)) {
                return "Invalid Ethereum address.";
            }
            const apiUrl = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YOUR_ETHERSCAN_API_KEY`;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.status === "1") {
                      const balanceWei = data.result;
                    const balanceEth = parseFloat(ethers.utils.formatEther(balanceWei));
                    return `Ethereum Balance: ${balanceEth} ETH`;
                } else {
                   return "Error from Etherscan API: " + data.message;
                }

            } catch (error) {
                 return "Error fetching Ethereum balance: " + error;
            }
        }


        async function checkBalances() {
            const btcAddress = document.getElementById("btcAddress").value;
            const ethAddress = document.getElementById("ethAddress").value;

            document.getElementById("btcResult").textContent = "Loading...";
            document.getElementById("ethResult").textContent = "Loading...";


            const btcResult = await getBitcoinBalance(btcAddress);
            document.getElementById("btcResult").textContent = btcResult;

            const ethResult = await getEthereumBalance(ethAddress);
            document.getElementById("ethResult").textContent = ethResult;
        }
    </script>
     <script src="https://cdn.ethers.io/lib/ethers-5.7.umd.min.js" type="application/javascript"></script>

</body>
</html>

Html
Running the HTML-Based Checker
Open HTML File in Browser:

Locate the balance.html file.

Open it with any web browser.

Enter Addresses:

Type Bitcoin and Ethereum addresses in the respective input fields.

Click Button:

Click the "Check Balances" button.

Expected Output
The balances for the provided BTC and ETH addresses will appear below their respective input fields on the web page.

Usage Notes
API Key: Double check that your API key is properly placed into the javascript code.

Error Handling: The code provides some basic error handling.

Styling: Modify the CSS to change the look and feel of the page.

No Node.js: Unlike the console version, you don't need Node.js to run this HTML page.