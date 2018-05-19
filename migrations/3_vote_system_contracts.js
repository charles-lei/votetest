var VoteSystem = artifacts.require("./VoteSystem.sol");

module.exports = function(deployer) {
  deployer.deploy(VoteSystem);
};
