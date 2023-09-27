import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WalletComponent } from './components/wallet/wallet.component'; 
import { RegisterComponent } from './components/register/register.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { VisualInsightsComponent } from './components/visual-insights/visual-insights.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'visual-insights', component: VisualInsightsComponent, canActivate: [AuthGuard] },
  { path: 'my-profile/:id', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
