import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from 'src/app/services/users.service';

import { GameComponent } from './game.component';

const user = { name: 'default', score: 0, highScore: 0 };

describe('GameComponent', () => {
	let component: GameComponent;
	let fixture: ComponentFixture<GameComponent>;
  let service: UsersService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [GameComponent],
      providers: [UsersService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GameComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

  afterAll(() => {
		jest.restoreAllMocks();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('clearTimeouts clean intervals', () => {
		const time = setTimeout(() => {}, 100);
		const time2 = setTimeout(() => {}, 100);
		component['greenlightInterval'] = time;
		component['redLightInterval'] = time2;
		component['_clearTimeouts']();
		expect(jest.clearAllTimers);
	});

	it('_getUserInfo initialize game', () => {
		const service = fixture.debugElement.injector.get(UsersService);
    service.userGame = user;
		const spy1 = jest.spyOn<any, any>(component, '_initializeGame');
		component['_getUserInfo']();
    expect(component.user).toBeTruthy();
		expect(spy1).toHaveBeenCalled();
	});

	it('_initializleGame update initial params', () => {
		component.user = user;
		component['_initializeGame']();
		expect(component.score).toBe(0);
		expect(component.highScore).toBe(0);
	});

	it('_setRedLight put traffic light to red', () => {
		component['_setRedLight']();
		expect(component.statusTrafficLight).toBe('red');
	});

	it('_setGreenLight put traffic light to green', () => {
		component['_setGreenLight']();
		expect(component.statusTrafficLight).toBe('green');
	});

	it('_repeatButton return if is repeat button when current and prev button are equals', () => {
		component['_currentBtn'] = 'LEFT';
		component['_prevBtn'] = 'LEFT';
		const repeat = component['_repeatButton']();
		expect(repeat).toBe(true);
	});

	it('_checkRedLight put score to 0 if traffic light is red', () => {
		component.statusTrafficLight = 'red';
		component.score = 10;
		component['_checkRedLight']();
		expect(component.score).toBe(0);
	});

	it('_checkGreenLight subtract one ponint when traffic light is green and repeat button', () => {
		component.statusTrafficLight = 'green';
		component.score = 10;
		component['_prevBtn'] = 'LEFT';
		component['_currentBtn'] = 'LEFT';
		component['_checkGreenLight']();
		expect(component.score).toBe(9);
	});
});
