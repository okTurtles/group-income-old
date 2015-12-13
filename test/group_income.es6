contract('GroupIncome', function(accounts) {
  it("Initial groupIncome settings should match", async function() {
    var groupIncome = await GroupIncome.new(1000);
    var creator = await groupIncome.creator();
    assert.equal(creator, accounts[0], "Creator should be msg.sender.");

    var threshold = await groupIncome.basicIncomeThreshold();
    assert.equal(threshold, 1000, "basicIncomeThreshold should be what we set it as.");

    var member = await groupIncome.members(accounts[0]);
    var memberAddr = member[0];
    var memberAmountReceived = member[2];
    assert.equal(memberAddr, accounts[0], "Creator should be in members.");
    assert.equal(memberAmountReceived, 0, "You start with $0");

    var memberAddress = await groupIncome.memberAddresses(0);
    assert.equal(memberAddress, accounts[0], "Creator should be in memberAddresses.");
  });

  it("addMember should work", async function() {
    var groupIncome = await GroupIncome.new(1000);

    var addr = '0x82a978b3f5962a5b0957d9ee9eef472ee55b42f1';
    var name = 'Tibet';
    await groupIncome.addMember(addr, name);

    var memberAddress = await groupIncome.memberAddresses(0);
    assert.equal(memberAddress, addr, "memberAddresses should have given address.");

    var member = await groupIncome.members(addr);
    assert.equal(member[0], addr, "New user should be in members");
    assert.equal(member[1], name, "New user should be in members.");
    assert.equal(member[2], 0, "You start with $0");
  });

  it("payMember should increase amountReceivedThisPeriod", async function() {
    var groupIncome = await GroupIncome.new(1000);
    await groupIncome.payMember(accounts[0], 50);
    var member = await groupIncome.members(accounts[0]);

    assert.equal(member[2], 50, "Should be paid 50");
  });

  it("income should distribute correctly", async function() {
    var groupIncome = await GroupIncome.new(1000);
    var memberAddrs = [
      '0x82a978b3f5912a5b0957d9ee9eef472ee55b42f1',
      '0x82a978b3f5922a5b0957d9ee9eef472ee55b42f1',
      '0x82a978b3f5932a5b0957d9ee9eef472ee55b42f1'
    ];
    for (var i = 0; i < memberAddrs.length; i++) {
      var addr = memberAddrs[i];
      // Create members. Their names are addresses cuz whatever.
      await groupIncome.addMember(addr, addr);
    }

    await groupIncome.receiveIncome( { from: accounts[0], value: 3000 } );

    var incomeGenerator = await groupIncome.members(accounts[0]);
    assert.equal(incomeGenerator[2], 1000, "Should fill iG's bucket");

    for (var i = 0; i < memberAddrs.length; i++) {
      var addr = memberAddrs[i];
      var member = await groupIncome.members(addr);
      assert.equal(member[2], 1000, "Should be paid 1000");
    }
  });
});
