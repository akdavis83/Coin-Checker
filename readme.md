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
Run check.js in the VS code console


node Check.js
Expected Output
Example output for the given addresses:


Checking BTC Balance...
Bitcoin Balance: 68.84922675 BTC
Checking ETH Balance...
Ethereum Balance: 793.527040349318671037 ETH

2. HTML-Based Checker (Web Browser)
Description
This version provides a web page with input fields to enter Bitcoin and Ethereum addresses. It fetches balances and displays them directly on the page.


Open in Browser
Open the index.html file in your web browser.

Check Balances
Enter Bitcoin and Ethereum addresses and click the "Check Balances" button.

Expected Output
The balances for the provided addresses will be displayed below their respective input fields.

Usage Notes
Replace YOUR_ETHERSCAN_API_KEY in the scripts with your actual API key.
Modify the styling in the HTML file to customize the page's appearance.
Be mindful of API rate limits.
