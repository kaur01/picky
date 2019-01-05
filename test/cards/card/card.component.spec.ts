import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {CardComponent} from '../../../src/app/cards/card/card.component';

@suite
class CardComponentSpec {
  private component: CardComponent;

  before(): void {
    this.component = new CardComponent();
  }

  @test
  public shouldSelectACard(): void {
    this.component.select();

    expect(this.component.selected).to.be.true;
  }

  @test
  public shouldDeselectACard(): void {
    this.component.deselect();

    expect(this.component.selected).to.be.false;
  }
}
