import {suite, test} from 'mocha-typescript';
import {anything, instance, mock, verify, when} from 'ts-mockito';
import {SelectorCardComponent} from '../../src/app/selector-cards/selector-card/selector-card.component';
import {SelectorCardsComponent} from '../../src/app/selector-cards/selector-cards.component';
import {expect} from 'chai';
import {EventEmitter, QueryList} from '@angular/core';
import {Observable} from 'rxjs';

@suite
class SelectorCardsComponentSpec {
  private cardsComponent: SelectorCardsComponent;
  private cardComponent = mock(SelectorCardComponent);

  before(): void {
    this.cardsComponent = new SelectorCardsComponent();
  }

  @test
  public shouldSelectACard(): void {
    this.cardsComponent.selectCard(instance(this.cardComponent));

    verify(this.cardComponent.deselect()).never();
    verify(this.cardComponent.select()).once();
  }

  @test
  public shouldDeselectAlreadySelectedCard(): void {
    const card = mock(SelectorCardComponent);
    this.cardsComponent.selectCard(instance(card));

    const anotherCard = mock(SelectorCardComponent);
    this.cardsComponent.selectCard(instance(anotherCard));

    verify(card.deselect()).once();
  }

  @test
  public shouldSelectNewCardAfterDeselectingAlreadySelectedCard(): void {
    const card = mock(SelectorCardComponent);
    this.cardsComponent.selectCard(instance(card));

    const anotherCard = mock(SelectorCardComponent);
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

    const cardComponent = new SelectorCardComponent();
    cardComponent.cardSelected = instance(cardSelectedEvent);
    this.cardsComponent.cards = instance(queryList);

    when(queryList.toArray()).thenReturn([cardComponent, cardComponent]);
    when(cardSelectedEvent.pipe(anything())).thenReturn(instance(observable));

    await this.cardsComponent.ngAfterViewInit();

    verify(observable.subscribe(anything())).twice();
  }
}
