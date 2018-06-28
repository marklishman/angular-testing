
describe('A suite', function() {

  let obj;

  beforeAll(function() {
    obj = {};
  });

  beforeEach(function() {
    obj['a'] = 123;
  });

  afterEach(function() {
    delete obj.a;
  });

  afterAll(function() {
    obj = undefined;
  });

  it('should be a spec with some expectations', function() {
    obj.a++;
    expect(obj.a).toBe(124);
  });

  it('should fail explicitly', function() {
    if (2 > 3) {
      fail('it should never get here');
    }
  });

  xit('should not be run', function() {
    fail('this test is pending');
  });

  describe('A nested suite', function() {

    let val = false;

    beforeEach(function() {
      val = true;
    });

    it('should be a spec with some expectations', function() {
      expect(val).toBe(true);
    });

  });

  xdescribe('A disabled suite', function() {

    it('should not be run', function() {
      fail('this suite is disabled');
    });

  });

});
