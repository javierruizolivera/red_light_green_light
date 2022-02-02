import { TestBed } from '@angular/core/testing';
import { STORE } from '../constants/store';
import { User } from '../interfaces/user.interface';
import { UsersService } from './users.service';

const users: Array<User> = [
	{
		name: 'default1',
		score: 0,
		highScore: 0
	},
	{
		name: 'default',
		score: 5,
		highScore: 10
	}
];

const newUser: User = {
	name: 'NAME',
	score: 3,
	highScore: 20
};

const updatedUser = {
		name: 'default1',
		score: 5,
		highScore: 20 
}

const searchName = 'default';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UsersService);
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	/*   private _initUserStore() {
		const users = localStorage.getItem(STORE.USERS);
		return users ? JSON.parse(users) : [];
	} */

	it('_initUserStore return an empty array when localStore is empty', () => {
		const users = service['_initUserStore']();
		expect(users.length).toBe(0);
	});

	it('_initUserStore return a User array when localStorage is setting', () => {
		localStorage.setItem(STORE.USERS, JSON.stringify(users));
		const getUsers = service['_initUserStore']();
		expect(getUsers.length).toBe(2);
	});

	it('_saveUserStore save users', () => {
		service.users = users;
		service['_saveUserStore']();
		const getUsers = service['_initUserStore']();
		expect(getUsers.length).toBe(2);
	});

	it('_setUserGame set the name correctly', () => {
		service.userGame = null;
		service.setUserGame(users[0]);
		expect(service.userGame).not.toBe(null);
	});

	it('addNewUser add new user', () => {
    service.users = users;
    service.addNewUser(newUser);
    expect(newUser.name).toBe('name');
    expect(service.users.length).toBe(3);
  });

  it('updateUser update user', () => {
    service.users = users;
    service.updateUser(updatedUser);
    expect(service.users[0].score).toBe(5);
  })

  it ('findUser get an user', () => {
    service.users = users;
    const srchUser = service.findUser(searchName);
    expect(srchUser).toBeTruthy();
  })
});
