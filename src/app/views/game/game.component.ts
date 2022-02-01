import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRAFFICLIGHTSTATUS } from 'src/app/constants/trafficLightStatus';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
	private _timeRedLight: number;
	public _timeGreenLight: number;
	private _initTimeGreenLight: number;
	private _currentBtn: string;
	private _prevBtn: string;
	public statusTrafficLight: any;
	public user: User | null;
	public score: number;
	public highScore: number;

	constructor(private _router: Router, private _usersService: UsersService) {
		this.statusTrafficLight = 'red';
		this.user = null;
		this._timeRedLight = 3000;
		this._initTimeGreenLight = 10000;
		this._timeGreenLight = this._initTimeGreenLight;
		this.score = 0;
		this.highScore = 0;
		this._currentBtn = '';
		this._prevBtn = '';
	}

	ngOnInit(): void {
		this._getUserInfo();
	}

	ngOnDestroy(): void {
		if (this.user) {
			this._saveUserInfo();
		}
	}

	private _getUserInfo() {
		this.user = this._usersService.getUserGame();
		if (!this.user) {
			this._router.navigate(['/home']);
		} else {
			this._initializeGame();
			this._startGame();
		}
	}

	private _initializeGame() {
		if (this.user) {
			this.score = this.user.score;
			this.highScore = this.user.highScore;
			this._setTimeGreenLight();
		}
	}

	private _startGame() {
		this._setRedLight();
	}

	private _setTimeGreenLight() {
		const min = -1500;
		const max = 1500;
		this._timeGreenLight =
			Math.max(this._initTimeGreenLight - this.score * 100, 2000) +
			this._getRandomInteger(min, max);
	}

	private _setRedLight() {
		this.statusTrafficLight = TRAFFICLIGHTSTATUS.RED;
		setTimeout(() => {
			this._setGreenLight();
		}, this._timeRedLight);
	}

	private _setGreenLight() {
		this._setTimeGreenLight();
		this.statusTrafficLight = TRAFFICLIGHTSTATUS.GREEN;
		setTimeout(() => {
			this._setRedLight();
		}, this._timeGreenLight);
	}

	private _updateUserInfo() {
		this._updateScore();
	}

	private _updateScore() {
		this._checkRedLight();
		this._checkGreenLigth();
		this._checkHighScore();
		this._saveUserInfo();
	}

	private _checkRedLight() {
		this.score = this.statusTrafficLight === TRAFFICLIGHTSTATUS.RED ? 0 : this.score;
	}

	private _repeatButton() {
		return this._currentBtn === this._prevBtn;
	}

	private _checkGreenLigth() {
		if (this.statusTrafficLight === TRAFFICLIGHTSTATUS.GREEN && this._repeatButton()) {
			this.score--;
			this.score = this.score < 0 ? 0 : this.score;
		}
		if (this.statusTrafficLight === TRAFFICLIGHTSTATUS.GREEN && !this._repeatButton()) {
			this.score++;
		}
	}

	private _checkHighScore() {
		this.highScore = this.score > this.highScore ? this.score : this.highScore;
	}

	private _saveUserInfo() {
		if (this.user) {
			this.user.score = this.score;
			this.user.highScore = this.highScore;
			this._usersService.updateUser(this.user);
		}
	}

	private _getRandomInteger(min: number, max: number) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	public handlerClickBtn(btn: string) {
		this._prevBtn = this._currentBtn;
		this._currentBtn = btn === 'LEFT' ? 'LEFT' : 'RIGHT';
		this._updateUserInfo();
	}

	public leaveGame() {
		this._router.navigate(['/']);
	}
}
