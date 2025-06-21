document.getElementById("connect").addEventListener("click", async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const wallet = accounts[0];
    document.getElementById("status").innerText = "Wallet connected: " + wallet;
    chrome.storage.local.set({ wallet });
  } else {
    alert("Please install MetaMask!");
  }
});
