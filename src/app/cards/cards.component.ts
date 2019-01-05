import {AfterViewInit, Component, ContentChildren, OnDestroy, QueryList} from '@angular/core';
import {CardComponent} from './card/card.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-selector-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent implements AfterViewInit, OnDestroy {
  @ContentChildren('card')
  cards: QueryList<CardComponent>;
  destroyed: Subject<boolean> = new Subject<boolean>();

  private selectedCard: CardComponent;

  async ngAfterViewInit(): Promise<void> {
    this.cards.toArray().forEach(card => {
      card.cardSelected
        .pipe(takeUntil(this.destroyed))
        .subscribe((selectedCard) => {
          this.selectCard(selectedCard);
        });
    });
  }

  public selectCard(card: CardComponent) {
    if (this.selectedCard) {
      this.selectedCard.deselect();
    }

    this.selectedCard = card;
    card.select();
  }

  public getSelectedCard(): CardComponent {
    return this.selectedCard;
  }

  async ngOnDestroy(): Promise<void> {
    this.destroyed.next(true);
    this.destroyed.unsubscribe();
  }
}
