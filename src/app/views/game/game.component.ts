import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TIMESGAME } from 'src/app/constants/timesGame';
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
	private _currentBtn: string;
	private _prevBtn: string;
	private redLightInterval: ReturnType<typeof setTimeout> | undefined;
	private greenlightInterval: ReturnType<typeof setTimeout> | undefined;
	public timeGreenLight: number;
	public statusTrafficLight: any;
	public user: User | null;
	public score: number;
	public highScore: number;

	constructor(private _router: Router, private _usersService: UsersService) {
		this.statusTrafficLight = TRAFFICLIGHTSTATUS.RED;
		this.user = null;
		this._timeRedLight = TIMESGAME.TIME_RED_LIGHT;
		this.timeGreenLight = TIMESGAME.INIT_TIME_GREEN_LIGHT;
		this.score = 0;
		this.highScore = 0;
		this._currentBtn = '';
		this._prevBtn = '';
		this.redLightInterval = undefined;
		this.greenlightInterval = undefined;
	}

	ngOnInit(): void {
		this._getUserInfo();
	}

	ngOnDestroy(): void {
		if (this.user) {
			this._saveUserInfo();
		}
		this._clearTimeouts();
	}

	private _clearTimeouts() {
		if (this.greenlightInterval && this.redLightInterval) {
			clearTimeout(this.greenlightInterval);
			clearTimeout(this.redLightInterval);
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
		const min = TIMESGAME.RANDOM.MIN;
		const max = TIMESGAME.RANDOM.MAX;
		this.timeGreenLight =
			Math.max(
				TIMESGAME.INIT_TIME_GREEN_LIGHT - this.score * TIMESGAME.PENALITY,
				TIMESGAME.MINIMUM
			) + this._getRandomInteger(min, max);
	}

	private _setRedLight() {
		this.statusTrafficLight = TRAFFICLIGHTSTATUS.RED;
		this.redLightInterval = setTimeout(() => {
			this._setGreenLight();
		}, this._timeRedLight);
	}

	private _setGreenLight() {
		this._setTimeGreenLight();
		this.statusTrafficLight = TRAFFICLIGHTSTATUS.GREEN;
		this.greenlightInterval = setTimeout(() => {
			this._setRedLight();
		}, this.timeGreenLight);
	}

	private _updateScore() {
		this._checkRedLight();
		this._checkGreenLight();
		this._checkHighScore();
		this._saveUserInfo();
	}

	private _checkRedLight() {
		if (this.statusTrafficLight === TRAFFICLIGHTSTATUS.RED) {
			this.score = 0;
		}
	}

	private _repeatButton() {
		return this._currentBtn === this._prevBtn;
	}

	private _checkGreenLight() {
		if (
			this.statusTrafficLight === TRAFFICLIGHTSTATUS.GREEN &&
			this._repeatButton() &&
			this.score > 0
		) {
			this.score--;
		}
		if (this.statusTrafficLight === TRAFFICLIGHTSTATUS.GREEN && !this._repeatButton()) {
			this.score++;
		}
	}

	private _checkHighScore() {
		if (this.score > this.highScore) {
			this.highScore = this.score;
		}
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
		this._currentBtn = btn;
		this._updateScore();
	}

	public leaveGame() {
		this._router.navigate(['/']);
	}
}
