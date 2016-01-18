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
    addMember(creator, 'memberName');
  }

  // function to add members
  function addMember(address memberAddress, string memberName) {
    Member memory member = Member(memberAddress, memberName, 0);

    // Keeping track of memberAddresses so that we can loop over members
    memberAddresses.push(member.addr);
    members[member.addr] = member;
  }

  // Money comes into the system through msg:
  // - msg.sender is `incomeGenerator`, the Member that is giving the money to the Group
  // - msg.value is `income`, the amount of money being given to the Group
  //
  // On receipt of money:
  // 1. Try to fill up the sender's bucket first.
  //    If there is still money left, then:
  // 2. The software figures out how to best distribute the funds between all
  //    Members that have not yet reached their Threshold.
  //  - Find Member with the lowest amount and give them money until they have
  //    as much as the second lowest amount. Now bring both of those members up
  //    until they have as much as the third largest amount and so on. Of
  //    course, at any time in this if you run out of money you stop.
  // 3. Give extra money back to sender.
  function receiveIncome() public returns (bool success) {
    Member memory incomeGenerator = members[msg.sender];

    // First fill the incomeGenerator's bucket.
    uint income = fillBucket(msg.sender, msg.value);

    // Pay everyone else the leftover income / number of Members
    while (income > 1) {
      income = distributeIncome(income);
    }
  }


  function distributeIncome(uint income) returns (uint remainingIncome) {

    // Figure out who needs money and how much is the maximum we can give
    // everyone without putting anyone over their threshold.
    uint minimumOwed = basicIncomeThreshold;
    uint numberMembersToPay = 0;
    for (uint i = 0; i < memberAddresses.length; i++) {
      var member = members[memberAddresses[i]];
      uint amountReceived = member.amountReceivedThisPeriod;
      uint amountOwed = basicIncomeThreshold - amountReceived;

      if (amountOwed > 0) {
        numberMembersToPay += 1;
        if (amountOwed < minimumOwed) {
          minimumOwed = amountOwed;
        }
      }
    }

    // Send extra money back to incomeGenerator
    if (minimumOwed == 0) {
      payMember(msg.sender, income);
    }

    // If we were to give every group member that needs money the same amount,
    // we'd give them each:
    uint amountToPay = income / numberMembersToPay;

    // If amountToPay would bring a member above the threshold, we'll instead
    // give everyone what that person needs and then do this process again.
    if (minimumOwed < amountToPay) {
      amountToPay = minimumOwed;
    }

    // Make it rain.
    for (i = 0; i < memberAddresses.length; i++) {
      var memberAddr = memberAddresses[i];
      payMember(memberAddr, amountToPay);
      income -= amountToPay;
    }
    return income;
  }

  function fillBucket(address memberAddress, uint income) returns (uint leftOverIncome) {
    Member member = members[memberAddress];
    uint amountNeeded = basicIncomeThreshold - member.amountReceivedThisPeriod;
    if (amountNeeded > 0) {
      uint leftOvers = income - amountNeeded;
      if (leftOvers > 0) {
        payMember(member.addr, amountNeeded);
        return leftOvers;
      } else {
        payMember(member.addr, income);
        return 0;
      }
    }
  }

  function payMember(address memberAddress, uint amount) {
    Member member = members[memberAddress];
    member.amountReceivedThisPeriod += amount;
  }
}
