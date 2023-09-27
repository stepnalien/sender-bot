import Web3 from "web3";
const abi = [];

const privateKey = ""; // Replace with your private key
const tokenContractAddress = ""; // Replace with the token contract address
const recipientAddress = ""; // Replace with the recipient's address
const amountToSend = Web3.utils.toWei("100", "ether"); // Send 100 tokens // Replace with the amount of tokens to send

// Function to send tokens
async function sendTokens() {

  const web3 = new Web3("https://bsc-testnet.publicnode.com");
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

// Create an instance of the token contract
const tokenContract = new web3.eth.Contract(abi, tokenContractAddress);

  try {
    const nonce = await web3.eth.getTransactionCount(account.address, "latest");

    // Build the transaction
    const tx = {
      from: account.address,
      to: tokenContractAddress,
      gas: 200000, // Adjust gas limit as needed
      gasPrice: web3.utils.toWei("5", "gwei"), // Adjust gas price as needed
      nonce: nonce,
      data: tokenContract.methods
        .transfer(recipientAddress, amountToSend)
        .encodeABI(),
    };

    // Sign and send the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction Hash:", receipt.transactionHash);
  } catch (error) {
    console.error("Error sending tokens:", error);
  }
}

// Automate sending tokens every X milliseconds (e.g., every 30 seconds)
const interval = 30000; // 30 seconds
setInterval(sendTokens, interval);

// Uncomment the following line if you want to run the sendTokens function immediately
// sendTokens();