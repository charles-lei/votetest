// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";
// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
// import metacoin_artifacts from '../../build/contracts/MetaCoin.json'
// import votes_artifacts from '../../build/contracts/VoteSystem.json'
import votes_artifacts from '../../build/contracts/Vote.json'
// MetaCoin is our usable abstraction, which we'll use through the code below.
// var MetaCoin = contract(metacoin_artifacts);
// var VoteSystem = contract(votes_artifacts);
var Vote  = contract(votes_artifacts);
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;
window.App = {


  start: function() {
    Vote.setProvider(web3.currentProvider);
     // watch for changes
    
    // Bootstrap the MetaCoin abstraction for Use.
    // MetaCoin.setProvider(web3.currentProvider);
    // // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
    });
    this.watchCreate();
  },


  watchCreate: function(){
    Vote.deployed().then(function(instance) {
      // watch for changes
      var event = instance.SucceedSetVote();
      event.watch(function(error, result){
        if (!error){
          // console.log(result);
          alert('创建投票成功');
        }
      });
      event.stopWatching();
      // instance.SucceedSetVote(function(error, result){
      //   if (!error) {
      //     console.log(result);
      //     alert('创建投票成功');
      //   }
      // });
    });
  },


  createVote: function(params){
    Vote.deployed().then(function(instance) {
      return instance.setVote(params.serials, params.endTime, params.theme, params.proposals, {from: account});
    }).then(function(result){
      console.log('hadsfdf');
      console.log(result);
    }).catch(function(e) {
      console.log(e);
    });
  },


  getResult: function(params) {

  },

  //get proposal by serial when vote 
  getProposal: function(params){
    Vote.deployed().then(function(instance) {
      return instance.getProposal
    }
  },

  vote: function(params) {

  },
  // setStatus: function(message) {
  // },
  // refreshBalance: function() {
  //   // var self = this;

  //   // var meta;
  //   // MetaCoin.deployed().then(function(instance) {
  //   //   meta = instance;
  //   //   return meta.getBalance.call(account, {from: account});
  //   // }).then(function(value) {
  //   //   var balance_element = document.getElementById("balance");
  //   //   balance_element.innerHTML = value.valueOf();
  //   // }).catch(function(e) {
  //   //   console.log(e);
  //   //   self.setStatus("Error getting balance; see log.");
  //   // });
  // },
  // createVotes: function() {
  //   var self = this;
  //   var nickName = 'firstVote';
  //   var theme = 'firstTheme';
  //   var voterAddresses = ['0x36DC69A3cDF51De25dE600110e5fD16811906FB3','0x31107c95C62FE161Bce091716879e28d84e2A484'];
  //   VoteSystem.deployed().then(function(instance) {
  //     return instance.createVote(nickName, theme, voterAddresses, {from: account});
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error sending coin; see log.");
  //   });
  // },
  // getVotes: function() {
  //   var self = this;

  //   var meta;
  //   VoteSystem.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.votes.call({from: account});
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error getting balance; see log.");
  //   });
  // },
  // sendCoin: function() {
  //   var self = this;

  //   var amount = parseInt(document.getElementById("amount").value);
  //   var receiver = document.getElementById("receiver").value;

  //   this.setStatus("Initiating transaction... (please wait)");

  //   var meta;
  //   MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.sendCoin(receiver, amount, {from: account});
  //   }).then(function(res) {
  //     console.log(res)
  //     self.setStatus("Transaction complete!");
  //     self.refreshBalance();
  //   }).catch(function(e) {
  //     console.log(e);
  //     self.setStatus("Error sending coin; see log.");
  //   });
  // }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
  }

  App.start();
});
