const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payroll", function () {
  let payroll;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    const Payroll = await ethers.getContractFactory("Payroll");
    payroll = await Payroll.deploy();
    await payroll.deployed();
  });

  it("Should send payments to multiple addresses", async function () {
    const payees = [addr1.address, addr2.address, addr3.address];
    const amounts = [
      ethers.utils.parseEther("1"),
      ethers.utils.parseEther("2"),
      ethers.utils.parseEther("3"),
    ];
    const totalAmount = amounts.reduce((a, b) => a.add(b), ethers.BigNumber.from(0));

    await expect(
      payroll.send(payees, amounts, { value: totalAmount })
    ).to.changeEtherBalances(
      [addr1, addr2, addr3],
      amounts
    );
  });

  it("Should revert if payees and amounts lengths don't match", async function () {
    const payees = [addr1.address, addr2.address];
    const amounts = [ethers.utils.parseEther("1")];

    await expect(
      payroll.send(payees, amounts, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("Number of payees should match the number of payment amounts");
  });

  it("Should revert if total amount sent is less than sum of payments", async function () {
    const payees = [addr1.address, addr2.address];
    const amounts = [
      ethers.utils.parseEther("1"),
      ethers.utils.parseEther("2"),
    ];
    const totalAmount = amounts.reduce((a, b) => a.add(b), ethers.BigNumber.from(0));

    await expect(
      payroll.send(payees, amounts, { value: totalAmount.sub(1) })
    ).to.be.reverted;
  });
});