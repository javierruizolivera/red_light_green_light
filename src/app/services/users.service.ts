import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { STORE } from './../constants/store';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	public users: Array<User>;
	public userGame: User | null;

	constructor() {
		this.users = this._initUserStore();
		this.userGame = null;
	}

	private _initUserStore() {
		const users = localStorage.getItem(STORE.USERS);
		return users ? JSON.parse(users) : [];
	}

	private _saveUserStore() {
		localStorage.setItem(STORE.USERS, JSON.stringify(this.users));
	}

	private _findPosUser(name: string) {
		const nameLowerCase = name.toLowerCase();
		return this.users.findIndex((user: User) => user.name === nameLowerCase);
	}

	public findUser(name: string) {
		const nameLowerCase = name.toLowerCase();
		return this.users.find((user: User) => user.name === nameLowerCase);
	}

	public updateUser(userUpdated: User) {
		const pos = this._findPosUser(userUpdated.name);
		if (pos >= 0) {
			this.users[pos] = userUpdated;
		}
		this._saveUserStore();
	}

	public setUserGame(user: User) {
		this.userGame = user;
	}

	public getUserGame() {
		return this.userGame;
	}

	public addNewUser(newUser: User) {
		newUser.name = newUser.name.toLowerCase();
		this.users.push(newUser);
		this._saveUserStore();
	}
}
