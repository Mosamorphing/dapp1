import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import abi from "./abi.json";

const App = () => {
  const [currentBalance, setCurrentBalance] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const contractAddress = "0x019A352830936343C3c34A7df5511fa663fC19c5"; 

  useEffect(() => {
    getBalance();
  }, []);

  // Request account access
  async function requestAccount() {
    if (!window.ethereum) {
      toast.error("MetaMask is not installed!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      toast.error("Failed to connect wallet!");
      console.error(error);
    }
  }

  // Fetch the current balance
  async function getBalance() {
    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask is not installed!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const balance = await contract.getBalance();
      setCurrentBalance(ethers.formatEther(balance));
    } catch (error) {
      toast.error("Failed to fetch the balance!");
      console.error(error);
    }
  }

  // Deposit Ether
  async function handleDeposit() {
    if (!depositAmount) {
      toast.error("Enter a deposit amount!");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.deposit({ value: ethers.parseEther(depositAmount) });
      await tx.wait();
      toast.success("Deposit successful!");
      getBalance();
    } catch (error) {
      toast.error("Failed to deposit Ether!");
      console.error(error);
    }
  }

  // Withdraw Ether
  async function handleWithdraw() {
    if (!withdrawAmount) {
      toast.error("Enter a withdrawal amount!");
      return;
    }
    try {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.withdraw(ethers.parseUnits(withdrawAmount, "ether"));
      await tx.wait();
      toast.success("Withdrawal successful!");
      getBalance();
    } catch (error) {
      toast.error("Failed to withdraw Ether!");
      console.error(error);
    }
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundColor: "#f4f4f9"
    }}>
      <div style={{
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Mini dApp - ETH Manager</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          <strong>Current Contract Balance:</strong> {currentBalance} ETH
        </p>
        <div>
          <input
            type="number"
            placeholder="Deposit Amount in ETH"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            style={{
              fontSize: "1.2rem",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <button
            onClick={handleDeposit}
            style={{
              fontSize: "1.2rem",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              margin: "5px"
            }}
          >
            Deposit
          </button>
        </div>
        <div>
          <input
            type="number"
            placeholder="Withdraw Amount in ETH"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            style={{
              fontSize: "1.2rem",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "5px"
            }}
          />
          <button
            onClick={handleWithdraw}
            style={{
              fontSize: "1.2rem",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              margin: "5px"
            }}
          >
            Withdraw
          </button>
        </div>
        <button
          onClick={getBalance}
          style={{
            fontSize: "1.2rem",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            margin: "5px"
          }}
        >
          Refresh Balance
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
