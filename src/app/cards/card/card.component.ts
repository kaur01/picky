import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-selector-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input()
  iconLink: string;

  @Input()
  label: string;

  @Input()
  selected: boolean;

  @Output()
  cardSelected = new EventEmitter<CardComponent>();

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
