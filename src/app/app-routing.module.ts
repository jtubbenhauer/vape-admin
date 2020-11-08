import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './layout/navigation/navigation.component';

const routes: Routes = [{
  path: '',
  component: NavigationComponent,
  children: [
    {
      path: '',
      loadChildren: () => 
        import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path: 'suppliers',
      loadChildren: () =>
        import('@modules/suppliers/suppliers.module').then(m => m.SuppliersModule)
    },
    {
      path: 'base-liquids',
      loadChildren: () =>
        import('@modules/base-liquids/base-liquids.module').then(m => m.BaseLiquidsModule)
    },
    {
      path: 'flavours',
      loadChildren: () =>
        import('@modules/flavours/flavours.module').then(m => m.FlavoursModule)
    }
  ]
}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
