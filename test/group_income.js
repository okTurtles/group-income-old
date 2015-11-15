contract('GroupIncome', function(accounts) {
  it("Initial groupIncome settings should match", function(done) {
    GroupIncome.new(1000)
      .then(function(groupIncome) {
        groupIncome.creator.call().then(function (creator) {
          assert.equal(creator, accounts[0], "Creator should be msg.sender.");
          return groupIncome.basicIncomeThreshold.call();
        }).then(function(threshold) {
          assert.equal(threshold, 1000, "basicIncomeThreshold should be what we set it as.");
          return groupIncome.members.call(accounts[0]);
        }).then(function(member) {
          assert.equal(member[0], accounts[0], "Creator should be in members.");
          assert.equal(member[2], 0, "You start with $0");
          return groupIncome.memberAddresses.call(0);
        }).then(function(memberAddress) {
          assert.equal(memberAddress, accounts[0], "Creator should be in memberAddresses.");
          done();
      }).catch(done);
    }).catch(done);
  });
  it("addMember should work", function(done) {
    GroupIncome.new(1000)
      .then(function(groupIncome) {
        var addr = '0x82a978b3f5962a5b0957d9ee9eef472ee55b42f1';
        var name = 'Tibet';
        groupIncome.addMember(addr, name).then(function (){
          return groupIncome.memberAddresses.call(0);
        })
        .then(function(memberAddress) {
          assert.equal(memberAddress, addr, "You start with $0");
          return groupIncome.members.call(addr);
        })
        .then(function(member) {
          assert.equal(member[0], addr, "Creator should be in members.");
          assert.equal(member[1], name, "Creator should be in members.");
          assert.equal(member[2], 0, "You start with $0");
          done();
      }).catch(done);
    }).catch(done);
  });
});
