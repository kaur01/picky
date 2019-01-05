import {expect} from 'chai';
import {suite, test} from 'mocha-typescript';
import {SelectorCardComponent} from '../../../src/app/selector-cards/selector-card/selector-card.component';

@suite
class SelectorCardComponentSpec {
  private component: SelectorCardComponent;

  before(): void {
    this.component = new SelectorCardComponent();
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
