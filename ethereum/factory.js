import web3 from './web3';
import MalwareDetection from './build/MalwareDetection.json';

const instance = new web3.eth.Contract(
  JSON.parse(MalwareDetection.interface),
  '0x8b392F61c3acb628245560f84d39f2170A574ec7'
);

export default instance;
