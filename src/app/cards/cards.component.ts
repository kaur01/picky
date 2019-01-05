import {AfterViewInit, Component, ContentChildren, OnDestroy, QueryList} from '@angular/core';
import {SelectorCardComponent} from './selector-card/selector-card.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-selector-cards',
  templateUrl: './selector-cards.component.html'
})
export class SelectorCardsComponent implements AfterViewInit, OnDestroy {
  @ContentChildren('card')
  cards: QueryList<SelectorCardComponent>;
  destroyed: Subject<boolean> = new Subject<boolean>();

  private selectedCard: SelectorCardComponent;

  async ngAfterViewInit(): Promise<void> {
    this.cards.toArray().forEach(card => {
      card.cardSelected
        .pipe(takeUntil(this.destroyed))
        .subscribe((selectedCard) => {
          this.selectCard(selectedCard);
        });
    });
  }

  public selectCard(card: SelectorCardComponent) {
    if (this.selectedCard) {
      this.selectedCard.deselect();
    }

    this.selectedCard = card;
    card.select();
  }

  public getSelectedCard(): SelectorCardComponent {
    return this.selectedCard;
  }

  async ngOnDestroy(): Promise<void> {
    this.destroyed.next(true);
    this.destroyed.unsubscribe();
  }
}
