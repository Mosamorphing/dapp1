// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {

  const simples = m.contract("SimpleStorage");
  return { simples };
});

export default SimpleStorageModule;
