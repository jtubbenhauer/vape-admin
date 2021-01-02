import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { NavigationComponent } from './layout/navigation/navigation.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },

  {
  path: 'admin',
  component: NavigationComponent,
  children: [
    {
      path: '',
      loadChildren: () => 
      import('@modules/mixing/mixing.module').then(m => m.MixingModule)
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
    },
    {
      path: 'recipes',
      loadChildren: () =>
        import('@modules/recipes/recipes.module').then(m => m.RecipesModule)
    },
    {
      path: 'mixing',
      loadChildren: () =>
        import('@modules/mixing/mixing.module').then(m => m.MixingModule)
    },
    {
      path: 'invoices',
      loadChildren: () =>
        import('@modules/invoices/invoices.module').then(m => m.InvoicesModule)
    }
  ]
}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
