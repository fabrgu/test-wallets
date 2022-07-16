import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

console.log('Welcome to Wallet!');

const stdlib = loadStdlib(process.env);
console.log(`The consensus network is ${stdlib.connector}.`);
const toAU = (su) => stdlib.parseCurrency(su);
const suStr = stdlib.standardUnit;
const toSU = (au) => stdlib.formatCurrency(au, 4);
const startingBalance = toAU(1000);

const bob = await stdlib.newTestAccount(startingBalance);
const alice = await stdlib.newTestAccount(startingBalance);

const ctcBob = bob.contract(backend);
const ctcAlice = alice.contract(backend, ctcBob.getInfo());

const addrs = {
  'Alice': alice.getAddress(),
  'Bob': bob.getAddress(),
};
console.log(`Bob address: ${addrs['Bob']}`);

await Promise.all([
    ctcBob.p.Bob({
        requestAddress: bob.getAddress(),
        showBalance: async () => {
            console.log(`Bob balance is ${toSU(await stdlib.balanceOf(bob))} ${suStr}.`);
        }
    }),
    ctcAlice.p.Alice({
        displayAddress: (accAddress) => {
            console.log(`Account address is ${accAddress}`);
        }
      }),
  ]);