
/*
    jasmine-matcher-examples

    Jasmine Matchers

    Examples of Jasmine matchers including truthy and falsy comparisons, equality
    (`toBe` and `toEqual`)


    .. and more

 */


describe('Jasmine Matchers', () => {

  it('actual values should match truthy and falsy', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
  });

  it('not should negate the condition', () => {
    expect( null).not.toBeTruthy();
  });

  it('toBe and toEqual should check for equality', () => {
    expect(1).toBe(1.0);
    expect(1).toEqual(1.0);
  });

  it('toBe and toEqual should behave differently for objects', () => {

    // toBe uses ===
    // toEqual uses deep equality comparison

    const obj = { a: 123 };
    expect(obj).toBe(obj);
    expect(obj).toEqual(obj);

    const same = { a: 123 };
    expect(obj).not.toBe(same);
    expect(obj).toEqual(same);

    const different = { a: 321 };
    expect(obj).not.toBe(different);
    expect(obj).not.toEqual(different);
  });

  it('should be close to', () => {
    expect(123.45).toBeCloseTo(123.44, 1);
    expect(123.45).not.toBeCloseTo(123.44, 2);
  });

  it('should compare with', () => {
    expect(3).toBeGreaterThan(2);
    expect(3).toBeGreaterThanOrEqual(3);
    expect(2).toBeLessThan(3);
    expect(2).toBeLessThanOrEqual(2);
  });

  it('should check for null and undefined', () => {
    let obj;
    expect(obj).toBeUndefined();

    obj = {};
    expect(obj).toBeDefined();

    obj = null;
    expect(obj).toBeNull();
    expect(obj).toBeDefined();
  });

  it('should check for NaN', () => {
    expect(parseInt('xyz', 10)).toBeNaN();
  });

  it('should array to contain member', () => {
    expect([10, 20, 30]).toContain(20);
  });

  it('should match', () => {
    expect('Beware the moon').toContain('moo');
    expect('Beware the moon').toMatch('.*moo.');
  });

});
