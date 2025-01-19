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