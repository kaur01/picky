import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selector-card',
  templateUrl: './selector-card.component.html',
  styleUrls: ['./selector-card.component.css']
})
export class SelectorCardComponent {

  @Input()
  iconLink: string;

  @Input()
  label: string;

  @Input()
  selected: boolean;

  @Output()
  cardSelected = new EventEmitter<SelectorCardComponent>();

  onCardSelected(): void {
    this.cardSelected.emit(this);
  }

  public select(): void {
    this.selected = true;
  }

  public deselect(): void {
    this.selected = false;
  }
}
