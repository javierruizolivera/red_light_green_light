import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UsersService } from 'src/app/services/users.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GameComponent } from '../game/game.component';

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{ path: 'game', component: GameComponent }])],
			declarations: [HomeComponent],
			providers: [UsersService, FormBuilder],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('removeError change attribute error to false', () => {
		component.error = true;
		component.removeError();
		expect(component.error).toBe(false);
	});

	it('createUser with empty name set error true', () => {
		component['_createForm']();
		component.createUser();
		expect(component.error).toBe(true);
	});

	it('createUser added an element to users array', () => {
		const formBuild = fixture.debugElement.injector.get(FormBuilder);
		const service = fixture.debugElement.injector.get(UsersService);
		service.users = [];
		component.userForm = formBuild.group({
			userName: new FormControl('default')
		});
		component.createUser();
		expect(service.users.length).toBe(1);
	});
});
