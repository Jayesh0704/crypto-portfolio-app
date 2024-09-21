# Crypto Portfolio App



## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Tech stack](#tech-stack)
- [APIs Used](#apis-used)
- [Commands](#commands)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [References](#references)

## Introduction

**Crypto Docker** is a responsive and interactive cryptocurrency portfolio management web application. It allows users to connect their Ethereum wallets, track token balances, view historical balances, manage allowances, and perform token transfers seamlessly. Leveraging the power of React.js, and the CoinGecko API, the app provides real-time data and a user-friendly interface for cryptocurrency enthusiasts.

**Deployed App**: [Crypto Portfolio App](https://crypto-docker.netlify.app/)

## Features

- **Wallet Connection**: Securely connect your Ethereum wallet to view and manage your token balances.
- **Token Watchlist**: Add and monitor specific tokens to keep track of their real-time prices and performance.
- **Token Transfer**: Easily transfer tokens between wallets directly from the app interface.
- **Historical Balances**: Visualize your token balances over different time frames (24 hours, 30 days, 3 months, 1 year, Custom).
- **Allowance Management**: Check and approve token allowances to interact with various smart contracts.
- **Real-Time Data**: Fetch live token prices and market data from the CoinGecko API.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices ensuring a consistent user experience.
- **Error Handling**: Robust error boundaries to catch and display errors gracefully.
- **Interactive UI Elements**: Enhanced user interactions with hover effects, animations, and smooth transitions.

## Demo

You can view the live app at the following link:  
👉 [Crypto Portfolio App](https://crypto-docker.netlify.app/) 

### Screenshots
   [Checkout src/assets/All-pages-demo-pics.dox](https://docs.google.com/document/d/1Uo9MT8Su9hAmaZrY-T9yefFAeExze40_/edit?usp=sharing&ouid=114987110186535211354&rtpof=true&sd=true)


## Technologies Used

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Material UI (MUI)**: A popular React UI framework with pre-built components.
- **React Router DOM**: Declarative routing for React applications.
- **React Query (@tanstack/react-query)**: Data-fetching library for managing server state.
- **Axios**: Promise-based HTTP client for making API requests.
- **Lodash.debounce**: Utility for debouncing functions to optimize performance.
- **Vite**: A fast frontend build tool and development server.
- **Recharts**: A charting library to display historical data.

### Blockchain

- **Ethereum**: Integration with the Ethereum blockchain for wallet connections and token interactions.
- **Ethers.js**: A library to interact with the Ethereum blockchain and its ecosystem.
- **CoinGecko API**: Fetch real-time cryptocurrency data such as prices and historical trends.

### State Management

- **React Context API**: For managing global state across the application.

### Build Tools

- **Vite**: Enhanced build performance and development experience.

## Installation

Follow these steps to set up and run Crypto Portfolio App locally on your machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **Yarn**

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/CRYPTO-PORTFOLIO-APP.git
    cd CRYPTO-PORTFOLIO-APP
    ```

2. **Install Dependencies**

    Using **npm**:

    ```bash
    npm install
    ```

    Using **Yarn**:

    ```bash
    yarn install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the root directory and add the necessary environment variables. For example:

    ```env
    VITE_API_URL=https://api.coingecko.com/api/v3
    VITE_WALLET_PROVIDER_URL=https://your-wallet-provider.com
    ```

    > **Note:** Ensure that `.env` is listed in your `.gitignore` to prevent sensitive information from being committed to the repository.

4. **Run the Development Server**

    Using **npm**:

    ```bash
    npm run dev
    ```

    Using **Yarn**:

    ```bash
    yarn dev
    ```

5. **Open the App in Browser**

    Navigate to `http://localhost:5173` (or the port specified in your terminal) to view the application.

## Usage

### Connect Your Wallet

- Click on the "Connect Wallet" button in the header to link your Ethereum wallet.
- Once connected, you can view your token balances and perform transactions.

### Manage Your Watchlist

- Add your favorite tokens to the watchlist to monitor their real-time prices and performance.
- Remove tokens from the watchlist as needed.

### Transfer Tokens

- Navigate to the "Token Transfer" section to send tokens to another wallet address.
- Ensure you have sufficient balance and have approved the necessary allowances.

### View Historical Balances

- Access the "Historical Balance" section to visualize your token holdings over different time frames.
- Customize the date range to analyze specific periods.

### Manage Allowances

- Check the current allowances set for your tokens.
- Approve or revoke allowances to interact with smart contracts securely.

## Folder Structure

```plaintext
CRYPTO-PORTFOLIO-APP/
│
├── public/
│   └── index.html
├── src/
│   ├── abis/
│   │   └── ERC20ABI.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Banner/
│   │   │   ├── Banner.jsx
│   │   │   └── Carousel.jsx
│   │   ├── Coin/
│   │   │   ├── CoinInfo.jsx
│   │   │   ├── CoinPage.jsx
│   │   │   └── CoinsTable.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Animations.js
│   │   ├── ErrorBoundary.jsx
│   │   ├── HistoricalBalance.jsx
│   │   ├── SelectButton.jsx
│   │   ├── TokenTransfer.jsx
│   │   └── WatchList.jsx
│   ├── config/
│   │   ├── api.js
│   │   └── data.js
│   ├── contexts/
│   ├── features/
│   │   ├── AllowanceCheck/
│   │   │   └── AllowanceCheck.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   └── HomePage/
│   │       └── HomePage.jsx
│   ├── Wallet/
│   │   ├── WalletConnection.jsx
│   │   └── WalletInfo.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── .gitignore
├── eslintconfig.js
├── postcss.config.js
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```





## Tech Stack

### Frontend
- **React.js**: For building user interfaces.
- **Material UI**: For styled components.
- **Tailwind CSS**: For utility-first CSS.
- **Recharts**: For data visualization.
- **Ethers.js**: For interacting with the Ethereum blockchain.

### Blockchain
- **Ethereum**: For smart contract interactions.
- **CoinGecko API**: For fetching real-time and historical data.

### Build Tools
- **Vite**: For faster and leaner builds.
- **Netlify**: For deployment.

## APIs Used
- **CoinGecko API**
  - `CoinList`: Retrieves the top 100 coins by market cap.
  - `SingleCoin`: Fetches detailed information about a coin.
  - `HistoricalChart`: Provides historical price data.

```javascript
export const CoinList = currency => \`https://api.coingecko.com/api/v3/coins/markets?vs_currency=\${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false\`;
export const SingleCoin = id => \`https://api.coingecko.com/api/v3/coins/\${id}\`;
export const HistoricalChart = (id, days, currency) => \`https://api.coingecko.com/api/v3/coins/\${id}/market_chart?vs_currency=\${currency}&days=\${days}\`;
```

 Ethereum Blockchain

**Ethers.js**: Utilized for interacting with the Ethereum blockchain, enabling wallet connections, token transfers, and allowance management.

## Commands

Here are some helpful commands to run in your terminal while working with the project:

### Install Dependencies

Using **npm**:

```bash
npm install
```

### Start Development Server

#### Using npm:

```bash
npm run dev
```
### Build For Production

#### using npm:

```bash
npm run build
```
## Deployment - Steps for Netlify

1. Login to Netlify: Go to https://www.netlify.com/ and log in or sign up.
2. New Site from Git: Click on "New site from Git" and connect your GitHub repository.
3. Configure Build Settings:
   - Build Command: `npm run build` or `yarn build`
   - Publish Directory: `dist`
4. Deploy Site: Click on "Deploy Site" and wait for the deployment to complete.
5. Set Up Environment Variables: If your app uses environment variables, set them up in the Netlify dashboard under "Site settings" > "Build & deploy" > "Environment".


## Contributing
- Contributions are welcome! Follow these steps to contribute to Crypto Portfolio App:

- Fork the Repository
- Click the "Fork" button at the top-right corner of the repository page.

- Clone Your Fork
```bash
git clone https://github.com/jayesh0704/CRYPTO-PORTFOLIO-APP.git
cd CRYPTO-PORTFOLIO-APP
````

- Create a New Branch
```bash
git checkout -b feature/YourFeatureName
`````

- Make Your Changes
- Implement your feature or bug fix.

- Commit Your Changes
```branch
git commit -m "Add some feature"
```

- Push to Your Fork
```branch
git push origin feature/YourFeatureName
```

- Create a Pull Request
- Navigate to the original repository and click "New Pull Request."
- Provide a clear description of your changes and the problem they solve.

## License
- Distributed under the MIT License. See LICENSE for more information.

## Contact
#### Project Link: https://github.com/jayesh0704/CRYPTO-PORTFOLIO-APP
##### Email: f20210873@pilani.bits-pialni.ac.in

Made with ❤️ by Jayesh

## References

- https://www.youtube.com/playlist?list=PLbtI3_MArDOnIIJxB6xFtpnhM0wTwz0x6
- https://www.youtube.com/watch?v=QA6oTpMZp84
- https://chat.openai.com/chat