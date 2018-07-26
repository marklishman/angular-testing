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

  let user: User;

  beforeEach(() => {
    user = new User();
  });

  it('should work without spies', () => {
    expect(user.fullName()).toBe('Bob Jones');
  });

  describe('spyOn', () => {
    it('should replace a method on an existing object', () => {
      spyOn<User>(user, 'fullName').and.returnValue('Joe Smith');
      expect(user.fullName()).toBe('Joe Smith');
    });
  });

  describe('createSpy', () => {
    it('should replace a method on a new object', () => {
      user = {
        firstName: null,
        lastName: null,
        fullName: createSpy().and.returnValue('Pete Wilson'),
        userName: createSpy().and.returnValue('petewilson')
      };
      expect(user.fullName()).toBe('Pete Wilson');
      expect(user.userName()).toBe('petewilson');
    });

    it('should replace a method on an existing object', () => {
      user = new User();
      user.fullName = createSpy().and.returnValue('Sarah Brooks');
      expect(user.fullName()).toBe('Sarah Brooks');
    });
  });

  describe('createSpyObj', () => {
    it('should replace multiple methods using method names in an array', () => {
      user = createSpyObj<User>(
        [
          'fullName',
          'userName'
        ]
      );
      (<Spy>user.fullName).and.returnValue('Sue Robson');

      expect(user.fullName()).toBe('Sue Robson');
      expect(user.userName()).toBe(undefined);
    });

    it('should replace multiple methods with values using method names and values in an object', () => {
      user = createSpyObj<User>(
        {
          fullName: 'Rita Watson',
          userName: 'ritawatson'
        }
      );

      expect(user.fullName()).toBe('Rita Watson');
      expect(user.userName()).toBe('ritawatson');
    });
  });

});
