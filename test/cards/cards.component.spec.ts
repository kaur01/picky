import {suite, test} from 'mocha-typescript';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {CardComponent} from '../../src/app/cards/card/card.component';
import {CardsComponent} from '../../src/app/cards/cards.component';
import {expect} from 'chai';
import {EventEmitter, QueryList} from '@angular/core';
import {Observable} from 'rxjs';

@suite
class CardsComponentSpec {
  private cardsComponent: CardsComponent;
  private cardComponent = mock(CardComponent);

  before(): void {
    this.cardsComponent = new CardsComponent();
  }

  @test
  public shouldSelectACard(): void {
    this.cardsComponent.selectCard(instance(this.cardComponent));

    verify(this.cardComponent.deselect()).never();
    verify(this.cardComponent.select()).once();
  }

  @test
  public shouldDeselectAlreadySelectedCard(): void {
    const card = mock(CardComponent);
    this.cardsComponent.selectCard(instance(card));

    const anotherCard = mock(CardComponent);
    this.cardsComponent.selectCard(instance(anotherCard));

    verify(card.deselect()).once();
  }

  @test
  public shouldSelectNewCardAfterDeselectingAlreadySelectedCard(): void {
    const card = mock(CardComponent);
    this.cardsComponent.selectCard(instance(card));

    const anotherCard = mock(CardComponent);
    this.cardsComponent.selectCard(instance(anotherCard));

    verify(anotherCard.select()).calledAfter(card.deselect());
  }

  @test
  public shouldReturnSelectedCard(): void {
    this.cardsComponent.selectCard(instance(this.cardComponent));

    expect(this.cardsComponent.getSelectedCard()).to.equal(instance(this.cardComponent));
  }

  @test
  public async shouldRegisterForCardSelectedEventForAllCards(): Promise<void> {
    const queryList = mock(QueryList);
    const observable = mock(Observable);
    const cardSelectedEvent = mock(EventEmitter);

    const cardComponent = new CardComponent();
    cardComponent.cardSelected = instance(cardSelectedEvent);
    this.cardsComponent.cards = instance(queryList);

    when(queryList.toArray()).thenReturn([cardComponent, cardComponent]);
    when(cardSelectedEvent.pipe(anything())).thenReturn(instance(observable));

    await this.cardsComponent.ngAfterViewInit();

    verify(observable.subscribe(anything())).twice();
  }
}
