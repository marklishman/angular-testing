import createSpy = jasmine.createSpy;
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;

class User {
  firstName = 'Bob';
  lastName = 'Jones';

  fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  userName(): string {
    return this.firstName.toLowerCase() + this.lastName.toLowerCase();
  }
}

describe('Spies', () => {

  let dependency: User;

  beforeEach(() => {
    dependency = new User();
  });

  it('should work without spies', () => {
    expect(dependency.fullName()).toBe('Bob Jones');
  });

  describe('spyOn', () => {
    it('should replace a method on an existing object', () => {
      spyOn<User>(dependency, 'fullName').and.returnValue('Joe Smith');
      expect(dependency.fullName()).toBe('Joe Smith');
    });
  });

  describe('createSpy', () => {
    it('should replace a method on a new object', () => {
      dependency = {
        firstName: null,
        lastName: null,
        fullName: createSpy().and.returnValue('Pete Wilson'),
        userName: createSpy().and.returnValue('petewilson')
      };
      expect(dependency.fullName()).toBe('Pete Wilson');
      expect(dependency.userName()).toBe('petewilson');
    });

    it('should replace a method on an existing object', () => {
      dependency = new User();
      dependency.fullName = createSpy().and.returnValue('Sarah Brooks');
      expect(dependency.fullName()).toBe('Sarah Brooks');
    });
  });

  describe('createSpyObj', () => {
    it('should replace multiple methods using method names in an array', () => {
      dependency = createSpyObj<User>(
        [
          'fullName',
          'userName'
        ]
      );
      (<Spy>dependency.fullName).and.returnValue('Sue Robson');

      expect(dependency.fullName()).toBe('Sue Robson');
      expect(dependency.userName()).toBe(undefined);
    });

    it('should replace multiple methods with values using method names and values in an object', () => {
      dependency = createSpyObj<User>(
        {
          fullName: 'Rita Watson',
          userName: 'ritawatson'
        }
      );

      expect(dependency.fullName()).toBe('Rita Watson');
      expect(dependency.userName()).toBe('ritawatson');
    });
  });

});
