
/*
    jasmine-matcher-examples

    Jasmine Matchers

    Examples of Jasmine matchers including truthy and falsy comparisons, equality
    (`toBe` and `toEqual`)


    .. and more

 */


describe('Jasmine Matchers', () => {

  it('actual values should match truthy and falsy', () => {

    expect(1 === 1).toBeTruthy();
    expect(1 === 2).toBeFalsy();

  });

  it('not should negate the condition', () => {

    expect(1 === 2).not.toBeTruthy();

  });

  it('toBe and toEqual should check for equality', () => {

    expect(1).toBe(1.0);
    expect(1).toEqual(1.0);

  });

  it('toBe and toEqual should behave differently for objects', () => {

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

  it('should', () => {

    // expect(123.45).toBeCloseTo(123.44, 1);
    // expect({}).toBeDefined();
    // expect(3).toBeGreaterThan(2);
    // expect(number).toBeLessThan(number);
    // expect(number).toBeNaN();
    // expect(mixed).toBeNull();
    // expect(mixed).toBeUndefined();
    // expect(array).toContain(member);
    // expect(mixed).toEqual(mixed);

    // expect(spy).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledTimes(number);
    // expect(spy).toHaveBeenCalledWith(...arguments);
    // expect(mixed).toMatch(pattern);
    // expect(fn).toThrow(string);
    // expect(fn).toThrowError(string);
    //
    // jasmine.any(Constructor);
    // jasmine.anything(mixed);
    // jasmine.arrayContaining(mixed);
    // jasmine.objectContaining(mixed);
    // jasmine.stringMatching(pattern);

    expect().nothing();

  });
});
