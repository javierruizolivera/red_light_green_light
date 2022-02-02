import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [InputComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('write value updated value', () => {
		const value = 'myname';
		component.writeValue(value);
		expect(component.value).toBe('myname');
	});

	it('registerOnChange set function', () => {
		const change = () => {};
		component.onChange = null;
		component.registerOnChange(change);
		expect(component.onChange).toBe(change);
	});

	it('registerOnTouched set function', () => {
		const touch = () => {};
		component.onTouch = null;
		component.registerOnTouched(touch);
		expect(component.onTouch).toBe(touch);
	});

	it('setDisabledState disable property component', () => {
		component.isDisabled = false;
		component.setDisabledState(true);
		expect(component.isDisabled).toBe(true);
	});

	it('focus event emmit', () => {
		const input = fixture.nativeElement.querySelector('.input-container input');
		const spy = jest.spyOn<any, any>(component.focus, 'emit');
		input.dispatchEvent(new Event('focus'));
		fixture.detectChanges();
		expect(spy).toHaveBeenCalled();
	});
});
