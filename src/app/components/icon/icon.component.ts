import {
	ChangeDetectionStrategy,
	Component,
	DoCheck,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { Colors } from 'src/app/types/colors.type';
import { Icons } from '../../types/icons.type';
import iconPath from './iconPath';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit, OnChanges {
	@ViewChild('svgIconElement') svgIconElement: ElementRef<HTMLInputElement> = {} as ElementRef;
	@ViewChild('svgPathElement') useIconElement: ElementRef<HTMLInputElement> = {} as ElementRef;

	@Input() name: Icons = 'default';
	@Input() color: Colors = 'default';
	@Input() size: string = 'sm';

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.setIconAttributes();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.svgIconElement && this.svgIconElement.nativeElement) {
			this.setIconAttributes(changes);
		}
	}

	setIconAttributes(changes: any = null) {
		if (changes && changes.size) {
			this.svgIconElement.nativeElement.classList.remove(
				`app-icon--size-${changes.size.previousValue}`
			);
			this.svgIconElement.nativeElement.classList.add(`app-icon--size-${this.size}`);
		}

		if (changes && changes.color) {
			this.svgIconElement.nativeElement.classList.remove(
				`app-icon--color-${changes.color.previousValue}`
			);
			this.svgIconElement.nativeElement.classList.add(`app-icon--color-${this.color}`);
		}
		if (!changes) {
			this.svgIconElement.nativeElement.classList.add(`app-icon--size-${this.size}`);
			this.svgIconElement.nativeElement.classList.add(`app-icon--color-${this.color}`);
		}
		if (this.name && this._IconPathContains(this.name)) {
			this.useIconElement.nativeElement.setAttribute('d', iconPath[this.name]);
		}
	}
	private _IconPathContains(icon: Icons): boolean {
		try {
			const icn = iconPath[icon];
			return true;
		} catch (e) {
			return false;
		}
	}
}
