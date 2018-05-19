pragma solidity ^0.4.17;

contract VoteSystem {

  struct VoteStruct{
    address creater;
    string nickName;
    string theme;
    uint time;
    bool enabled;
    mapping(address => bool) voters;
  }

  VoteStruct[] public votes;
  address public contractOwner;

  function VoteSystem() public {
    contractOwner = msg.sender;

  }
 function cloceVote
  function createVote(string nickName, string theme, address[] voterAddress) public {

    votes.push(VoteStruct(msg.sender, nickName, theme, true));
    for (uint i = 0; i < voterAddress.length; i++) {
      votes[votes.length -1].voters[voterAddress[i]] = false;
    }
  }
}