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
import { WeightsWidgetComponent } from './page/weights-widget/weights-widget.component';
import { TestBatchComponent } from './page/test-batch/test-batch.component';
import { CalculatorDialogComponent } from './page/base-liquids-widget/calculator-dialog/calculator-dialog.component';
import { BatchHistoryComponent } from './page/batch-history/batch-history.component';


@NgModule({
  declarations: [MixingComponent, ConcentrateComponent, RtvComponent, DoublerComponent, BaseLiquidsWidgetComponent, QuickMixComponent, WeightsWidgetComponent, TestBatchComponent, CalculatorDialogComponent, BatchHistoryComponent],
  imports: [
    CommonModule,
    MixingRoutingModule,
    SharedModule
  ]
})
export class MixingModule { }
