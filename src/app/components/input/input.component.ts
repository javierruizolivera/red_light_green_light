import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	]
})
export class InputComponent implements OnInit, ControlValueAccessor {
	@Input() label: string = '';
	@Input() placeholder: string = '';
	@Input() isDisabled: boolean = false;
	@Output() focus = new EventEmitter();

	onChange: any = () => {};
	onTouch: any = () => {};

	ngOnInit(): void {}

	public handlerFocus() {
		this.focus.emit();
	}

	_value: any;

	@Input()
	set value(value) {
		if (value !== undefined && this._value !== value) {
			this._value = value;
			this.onChange(value);
			this.onTouch(value);
		}
	}

	get value() {
		return this._value;
	}

	writeValue(value: any) {
		this.value = value;
	}

	registerOnChange(fn: any) {
		this.onChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouch = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled = isDisabled;
	}
}
