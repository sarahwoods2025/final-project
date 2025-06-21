// ✅ Load environment variables early
require("dotenv").config();

// ✅ Import modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Web3 = require("web3").default;
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Load ABI & Contract Address
const contractABI = require("./studyPerks-api/studyPerksTokenABI.json");
const contractAddress = process.env.CONTRACT_ADDRESS;

// ✅ Setup Web3 Connection
const web3 = new Web3(process.env.INFURA_URL);
const privateKey = process.env.PRIVATE_KEY;

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

const contract = new web3.eth.Contract(contractABI, contractAddress);

// ✅ Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Step 1: Send Verification Email
app.post("/verify-email", async (req, res) => {
  const email = req.body.studentEmail;
  const wallet = req.body.walletAddress;

  console.log("Wallet:", wallet);
  console.log("Email:", email);

  if (!email.endsWith("@gmail.com")) {
    return res.send("❌ Invalid student email.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const verificationLink = `http://localhost:3000/confirm-email?wallet=${wallet}&email=${email}`;
  const mailOptions = {
    from: "StudyPerks <studyperkssbt@gmail.com>",
    to: email,
    subject: "Verify your student email for StudyPerks",
    html: `
      <h2>You're almost there!</h2>
      <p>Click the button below to verify your email and receive your StudyPerks token:</p>
      <a href="${verificationLink}" style="padding: 10px 20px; background-color: #e50914; color: white; text-decoration: none;">Verify Now</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("📧 A verification email has been sent to your inbox.");
  } catch (error) {
    console.error(error);
    res.send("❌ Failed to send verification email.");
  }
});

// ✅ Step 2: Email Confirmed & Mint Token
app.get("/confirm-email", async (req, res) => {
  const { email, wallet } = req.query;
  const tokenURI = "https://gateway.pinata.cloud/ipfs/bafkreigunmqdn6plqp5y5y67w5xklc3d2mrisrohw2djentzznr4v2qvvm";

    try {
    // ✅ Log admin wallet balance
    const balance = await web3.eth.getBalance(account.address);
    console.log("Admin wallet balance:", web3.utils.fromWei(balance, 'ether'), "ETH");

    // ✅ Build transaction
    const tx = contract.methods.mint(wallet, tokenURI);

    // ✅ Estimate gas with fallback
    let gas;
    try {
      gas = await tx.estimateGas({ from: account.address });
      console.log("Estimated gas:", gas);
    } catch (e) {
      console.error("❌ Failed to estimate gas, using fallback of 500000", e.message);
      gas = 500000;
    }

    // ✅ Encode ABI
    const data = tx.encodeABI();

    // ✅ Get nonce and gas price
    const gasPriceRaw = await web3.eth.getGasPrice(); // likely a decimal string like "2000000000"
    const gasPrice = BigInt(gasPriceRaw); // make it a BigInt for math
    const priorityFee = BigInt(web3.utils.toWei("2", "gwei"));
    const maxFee = gasPrice + priorityFee;

    const nonce = await web3.eth.getTransactionCount(account.address, "latest");

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data,
        gas,
        nonce,
        maxPriorityFeePerGas: web3.utils.toHex(priorityFee),
        maxFeePerGas: web3.utils.toHex(maxFee),
        from: account.address,
      },
      privateKey
    );

    // ✅ Send transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("✅ Minted token:", receipt.transactionHash);

    res.send("✅ Email confirmed and token issued to your wallet.");
  } catch (err) {
    console.error("❌ Minting error:", err);
    res.send("❌ Something went wrong minting the token.");
  }

});

// ✅ Route for all .ejs pages
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
