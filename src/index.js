import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import getConfig from "./config.js";
import * as nearlib from "near-api-js";

import App from "./App";
import NearContextProvider from "./context/NearContext";
import ContractContextProvider from "./hooks/contract";

// Initializing contract
async function InitContract() {
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // Initializing connection to the NEAR
  const near = await nearlib.connect({
    deps: {
      keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  // Needed to access wallet
  const walletConnection = new nearlib.WalletConnection(near);

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing our contract APIs by contract name and configuration.
  const contract = await new nearlib.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["get_corgi", "get_corgis_by_owner", "display_global_corgis", "get_token_owner"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["transfer_with_message", "create_corgi", "transfer_from_with_message", "delete_corgi"],
      // Sender is the account ID to initialize transactions.
      sender: walletConnection.getAccountId(),
    }
  );
  return { contract, currentUser, nearConfig, walletConnection, near };
}

window.nearInitPromise = InitContract()
  .then(({ contract, currentUser, nearConfig, walletConnection, near }) => {
    const app = (
      <NearContextProvider
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={walletConnection}
        near={near}
      >
        <ContractContextProvider Contract={contract}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContractContextProvider>
      </NearContextProvider>
    );

    ReactDOM.render(app, document.getElementById("root"));
  })
  .catch(console.error);
