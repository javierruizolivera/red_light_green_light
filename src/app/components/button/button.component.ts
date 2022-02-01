import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icons } from 'src/app/types/icons.type';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string;
  @Input() icon: Icons;
  @Output() clickEvent = new EventEmitter<string>();

  constructor() { 
    this.text = 'button';
    this.icon = 'default';
  }

  ngOnInit(): void {
  }

  handlerClick(){
    this.clickEvent.emit()
  }

}
