contract GroupIncome {
  uint public basicIncomeThreshold;
  address public creator;
  address[] public memberAddresses;
  mapping (address => Member) public members;

  struct Member {
    address addr;
    string name;
    uint amountReceivedThisPeriod;
  }

  function GroupIncome(uint _basicIncomeThreshold) {
    basicIncomeThreshold = _basicIncomeThreshold;
    creator = msg.sender;
    addMember(creator, 'keith');
  }

  // function to add members
  function addMember(address memberAddress, string memberName) {
    var member = Member(memberAddress, memberName, 0);

    // Keeping track of memberAddresses so that we can loop over members
    memberAddresses.push(member.addr);
    members[member.addr] = member;
  }
}
