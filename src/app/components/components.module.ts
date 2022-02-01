import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
	declarations: [ButtonComponent, InputComponent, HeaderComponent, IconComponent],
	imports: [CommonModule, FormsModule],
	exports: [ButtonComponent, InputComponent, HeaderComponent, IconComponent]
})
export class ComponentsModule {}
