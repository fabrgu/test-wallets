'reach 0.1';

export const main = Reach.App(() => {
  setOptions({ untrustworthyMaps: true });
  const Bob = Participant('Bob', {
    requestAddress: Address,
    showBalance: Fun(true, Null) 
  });
  const Alice = Participant('Alice', { 
    displayAddress: Fun(true, Null)
  });
  init();
  Bob.publish();
  const wallets = new Set();
  commit();

  Bob.only(() => {
    const address = declassify(interact.requestAddress);
  });
  Bob.publish(address);
  const bobAddress = this;
  wallets.insert(bobAddress);
  commit();

  Alice.only(() => {
    if(wallets.member(address)) {
        interact.displayAddress(address);
    }
  })

  Bob.only(() => {
    interact.showBalance();
  });

  exit();
});