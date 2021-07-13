const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/MalwareDetection.json');

const provider = new HDWalletProvider(
  'enable render dumb oil pioneer slide swing limb foil sport level trust',
  'https://rinkeby.infura.io/v3/c3246ae8d1924050ba8baf499e10dbd3'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '4000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();

// contract - 0x63493348a657079EE4dE70DdFa64B5A26A65a347
