import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card/card.component';
import {CardsComponent} from './cards.component';

@NgModule({
  declarations: [CardsComponent, CardComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent,
    CardsComponent
  ]
})
export class CardsModule {
}
