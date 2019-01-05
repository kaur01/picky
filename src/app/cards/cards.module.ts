import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectorCardComponent} from './selector-card/selector-card.component';
import {SelectorCardsComponent} from './selector-cards.component';

@NgModule({
  declarations: [SelectorCardsComponent, SelectorCardComponent],
  imports: [
    CommonModule
  ],
  exports: [SelectorCardComponent,
    SelectorCardsComponent
  ]
})
export class SelectorCardsModule {
}
