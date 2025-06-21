const Web3 = require("web3");
const contractABI = require("./studyPerksTokenABI.json"); // Update path if needed

const web3 = new Web3(process.env.INFURA_URL);
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

module.exports = async function verifyToken(wallet) {
  try {
    const balance = await contract.methods.balanceOf(wallet).call();
    return parseInt(balance) > 0;
  } catch (err) {
    console.error("Web3 error:", err);
    return false;
  }
};
