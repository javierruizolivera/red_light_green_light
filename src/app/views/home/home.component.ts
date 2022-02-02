import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public userForm: FormGroup;
	public error: Boolean;

	constructor(
		private _formBuilder: FormBuilder,
		private _usersServices: UsersService,
		private _router: Router
	) {
		this.userForm = this._createForm();
		this.error = false;
	}

	ngOnInit() {}

	public createUser() {
		const name: string = this.userForm?.getRawValue().userName;
		if (name === '') {
			this.error = true;
		} else {
			let user: User | number | undefined = this._usersServices.findUser(name);

			if (!user) {
				user = { name: name, score: 0, highScore: 0 };
				this._usersServices.addNewUser(user);
			}
			this._usersServices.setUserGame(user);
			this._navigateToGame();
		}
	}

	public removeError() {
		this.error = false;
	}

	private _navigateToGame() {
		this._router.navigate(['/game']);
	}

	private _createForm() {
		return this._formBuilder.group({
			userName: new FormControl('')
		});
	}
}
