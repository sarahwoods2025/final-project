(async () => {
  const wallet = (await chrome.storage.local.get("wallet")).wallet;
  if (!wallet) return;

  // Load Web3 (MetaMask injects it)
  const web3 = new Web3(window.ethereum);

  const contractABI = [ /* Paste your ABI here */ ];
  const contractAddress = "0xYourContractAddress";

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Replace this method with your smart contract's one
  const ownsToken = await contract.methods.balanceOf(wallet).call();

  if (parseInt(ownsToken) > 0) {
    console.log("✅ Student token detected");
    // You could trigger UI changes here like:
    // document.querySelector("#discount-code").value = "STUDENT10";
  }
})();
