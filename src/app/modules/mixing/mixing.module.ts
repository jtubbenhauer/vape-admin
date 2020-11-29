import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MixingRoutingModule } from './mixing-routing.module';
import { MixingComponent } from './page/mixing.component';
import { SharedModule } from 'app/shared/shared.module';
import { ConcentrateComponent } from './page/concentrate/concentrate.component';
import { RtvComponent } from './page/rtv/rtv.component';
import { DoublerComponent } from './page/doubler/doubler.component';
import { BaseLiquidsWidgetComponent } from './page/base-liquids-widget/base-liquids-widget.component';
import { QuickMixComponent } from './page/quick-mix/quick-mix.component';


@NgModule({
  declarations: [MixingComponent, ConcentrateComponent, RtvComponent, DoublerComponent, BaseLiquidsWidgetComponent, QuickMixComponent],
  imports: [
    CommonModule,
    MixingRoutingModule,
    SharedModule
  ]
})
export class MixingModule { }
