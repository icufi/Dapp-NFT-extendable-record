// eslint-disable-next-line no-undef
const BuilderTokens = artifacts.require('BuilderTokens');
const VisibleModes = artifacts.require('VisibleModes');
const ModeMirror = artifacts.require('ModeMirror');
const TestTokens = artifacts.require('TestTokens');

module.exports = function (deployer, network, accounts) {
  deployer.deploy(BuilderTokens, { from: accounts[0] });
  deployer.deploy(ModeMirror, { from: accounts[0] });
  deployer.deploy(VisibleModes, { from: accounts[0] });
  // deployer.deploy(TestTokens, { from: accounts[0] });
};
