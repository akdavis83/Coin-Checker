# Crypto Balance Checker

A tool to fetch Bitcoin and Ethereum balances using public APIs. This project includes two implementations:

1. **Console-Based Checker**: A Node.js script to check balances in the command line.
2. **HTML-Based Checker**: A web page to check balances in the browser.

---

## Console-Based Checker (Node.js)

This version uses Node.js to fetch Bitcoin and Ethereum balances from public APIs and displays them in the terminal.

### Prerequisites

- **Node.js**: [Download here](https://nodejs.org).
- **npm (Node Package Manager)**: Included with Node.js.
- **Etherscan API Key**: [Get yours here](https://etherscan.io/apis).

### Setup and Usage

1.  **Create a Project Directory**: Create a folder for your project (e.g., `check`).

2.  **Navigate to the Directory**: Open a terminal and navigate to the folder:

    ```bash
    cd check
    ```
3. **Initialize the Project**: Create a `package.json` file:

    ```bash
    npm init -y
    ```
4. **Install Dependencies**: Install the required packages:

    ```bash
    npm install node-fetch bitcoin-address-validation ethers
    ```
5. **Create the Script**: Create a file `check.js` in the directory and add the following code. Replace `YOUR_ETHERSCAN_API_KEY` with your actual Etherscan API key.
    ```javascript
    const fetch = require('node-fetch');
    const bitcoinAddressValidator = require('bitcoin-address-validation');
    const { ethers } = require('ethers');

    const btcAddress = '34xp4vRoCGJym3xR1eCvLd235Y6vrw6ex'; // Replace with your Bitcoin address
    const ethAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // Replace with your Ethereum address
    const etherscanApiKey = 'YOUR_ETHERSCAN_API_KEY'; // Replace with your Etherscan API Key


    async function getBitcoinBalance(address) {
        if (!bitcoinAddressValidator.validate(address)) {
            console.error('Invalid Bitcoin address');
            return null;
        }
        try {
            const response = await fetch(`https://blockchain.info/balance?active=${address}`);
            const data = await response.json();
            const balanceInSatoshis = data[address].final_balance;
            const balanceInBTC = balanceInSatoshis / 100000000;
            return balanceInBTC;
        } catch (error) {
            console.error('Error fetching Bitcoin balance:', error);
            return null;
        }
    }

    async function getEthereumBalance(address) {
        if (!ethers.isAddress(address)) {
            console.error('Invalid Ethereum address');
            return null;
        }

        try {
            const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanApiKey}`);
            const data = await response.json();
            if (data.status === '1' && data.message === 'OK') {
                const balanceInWei = data.result;
                const balanceInETH = ethers.formatEther(balanceInWei);
                return balanceInETH;
            } else {
                console.error('Error fetching Ethereum balance:', data.message);
                return null;
            }
        } catch (error) {
            console.error('Error fetching Ethereum balance:', error);
            return null;
        }
    }


    async function checkBalances() {
        console.log('Checking BTC Balance...');
        const btcBalance = await getBitcoinBalance(btcAddress);
        if (btcBalance !== null) {
          console.log('Bitcoin Balance:', btcBalance, 'BTC');
        }
    
        console.log('Checking ETH Balance...');
        const ethBalance = await getEthereumBalance(ethAddress);
        if (ethBalance !== null) {
           console.log('Ethereum Balance:', ethBalance, 'ETH');
        }

    }

    checkBalances();
    ```
6.  **Run the Script**: Execute the script:

    ```bash
    node check.js
    ```
7.  **Expected Output**: Example output for the provided addresses:

    ```yaml
    Checking BTC Balance...
    Bitcoin Balance: 68.84922675 BTC
    Checking ETH Balance...
    Ethereum Balance: 793.527040349318671037 ETH
    ```

---

## HTML-Based Checker (Web Browser)

This version provides a web page with input fields to enter Bitcoin and Ethereum addresses. It fetches balances and displays them directly on the page.

### Prerequisites

-   **Web Browser**: Any modern browser (e.g., Chrome, Firefox, Safari).
-   **Etherscan API Key**: [Get yours here](https://etherscan.io/apis).

### Setup and Usage

1.  **Create the HTML File**: Create a file `index.html` and add the following HTML code. Replace `YOUR_ETHERSCAN_API_KEY` with your actual API key.
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crypto Balance Checker</title>
        <style>
            body { font-family: sans-serif; padding: 20px; }
            .input-group { margin-bottom: 10px; }
            label { display: block; margin-bottom: 5px; }
            input { padding: 8px; border: 1px solid #ccc; width: 300px; }
            button { padding: 10px 15px; background-color: #4CAF50; color: white; border: none; cursor: pointer; }
            button:hover { background-color: #45a049; }
            #btcBalance, #ethBalance { margin-top: 5px; font-weight: bold; }
        </style>
    </head>
    <body>
        <h1>Crypto Balance Checker</h1>
        
        <div class="input-group">
            <label for="btcAddress">Bitcoin Address:</label>
            <input type="text" id="btcAddress" placeholder="Enter Bitcoin address">
            <div id="btcBalance"></div>
        </div>

        <div class="input-group">
            <label for="ethAddress">Ethereum Address:</label>
            <input type="text" id="ethAddress" placeholder="Enter Ethereum address">
            <div id="ethBalance"></div>
        </div>

        <button onclick="checkBalances()">Check Balances</button>

        <script>
            const etherscanApiKey = 'YOUR_ETHERSCAN_API_KEY'; // Replace with your Etherscan API Key

            async function getBitcoinBalance(address) {
                try {
                    const response = await fetch(`https://blockchain.info/balance?active=${address}`);
                    const data = await response.json();
                    const balanceInSatoshis = data[address].final_balance;
                    const balanceInBTC = balanceInSatoshis / 100000000;
                    return balanceInBTC;
                } catch (error) {
                    console.error('Error fetching Bitcoin balance:', error);
                    return null;
                }
            }

            async function getEthereumBalance(address) {
              try {
                    const response = await fetch(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${etherscanApiKey}`);
                    const data = await response.json();
                    if (data.status === '1' && data.message === 'OK') {
                      const balanceInWei = data.result;
                      const balanceInETH = parseFloat(ethers.formatEther(balanceInWei));
                        return balanceInETH;
                    } else {
                      console.error('Error fetching Ethereum balance:', data.message);
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching Ethereum balance:', error);
                    return null;
                }
            }

            async function checkBalances() {
                const btcAddress = document.getElementById('btcAddress').value;
                const ethAddress = document.getElementById('ethAddress').value;

                if (btcAddress) {
                    const btcBalanceDiv = document.getElementById('btcBalance');
                    btcBalanceDiv.textContent = 'Checking Bitcoin balance...';
                    const btcBalance = await getBitcoinBalance(btcAddress);
                    if (btcBalance !== null) {
                        btcBalanceDiv.textContent = `Bitcoin Balance: ${btcBalance} BTC`;
                    } else {
                        btcBalanceDiv.textContent = 'Error fetching Bitcoin balance';
                    }
                }
                if (ethAddress) {
                    const ethBalanceDiv = document.getElementById('ethBalance');
                    ethBalanceDiv.textContent = 'Checking Ethereum balance...';
                    const ethBalance = await getEthereumBalance(ethAddress);
                    if (ethBalance !== null) {
                        ethBalanceDiv.textContent = `Ethereum Balance: ${ethBalance} ETH`;
                    } else {
                       ethBalanceDiv.textContent = 'Error fetching Ethereum balance';
                    }
                }
            }
        </script>
    </body>
    </html>
    ```

2.  **Open in Browser**: Open the `index.html` file in your web browser.
3.  **Check Balances**: Enter Bitcoin and Ethereum addresses and click the "Check Balances" button.
4.  **Expected Output**: The balances for the provided addresses will be displayed below their respective input fields.

---

## Notes

-   Replace `YOUR_ETHERSCAN_API_KEY` in the scripts with your actual API key.
-   Be mindful of API rate limits when making repeated requests.
-   Modify the styling in the HTML file to customize the page's appearance.
