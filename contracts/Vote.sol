pragma solidity^0.4.18;
//pragma experimental ABIEncoderV2;

import "./CreateVote.sol";

contract Vote is CreateVote{
    
    event SucceedInVote(
        address sender,
        uint32 serial);
    
    event SucceedCheck(
        address sender,
        uint32 serial);
        
    //Í¶Æ±ÈË½á¹¹Ìå
    struct Voter{
        address voterAddress;
        bool state;
    }

    //Í¶Æ±ÈËµ½Í¶Æ±ÈËÑ¡ÔñµÄÓ³Éä
    //mapping(address => string) voterToProposalName;

    //´æ´¢ÒÑÍ¶¹ýÆ±µÄµØÖ·
    //address[] allVoters;
    
    // function vote
    function toVote(uint32 serial, uint32 index, string proposalName) public returns(string result){
        
        require(serial>0);
        assert(!verifySerial(serial));
        assert(!verifyAddress(serial,msg.sender));
        
        toMyVote[serial].allVoters.push(msg.sender);
        toMyVote[serial].voterToProposalName[msg.sender] = proposalName;
        toMyVote[serial].count[index]++;
        //count[i] = count[i]+1;
        
        emit SucceedInVote(msg.sender,serial);
        
        return "sucess!";
        
    }
    
    //check vote
    function checkVote(uint32 serial) public  returns(uint32[10] result){
        
        require(serial>0);
        assert(!verifySerial(serial));
        assert(verifyAddress(serial,msg.sender));
        
        uint32[10] memory tmp ;
        //tmp[0] =toMyVote[serial].count[0];
        for (uint32 j=0;j<10;j++){
            tmp[j] = toMyVote[serial].count[j];
        }
        
        emit SucceedCheck(msg.sender,serial);
        
        return tmp;
    }
    
    //verify address
    function verifyAddress(uint32 serial,address thisAddress) internal view returns(bool result){
        uint32 i=0;
        for(i;i<toMyVote[serial].allVoters.length;i++){
            if(toMyVote[serial].allVoters[i]==thisAddress)
                return true;
            if(i==toMyVote[serial].allVoters.length-1){
                return false;
            }
        }
    }
}
    
 
    