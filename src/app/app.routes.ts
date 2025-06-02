import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TiposGastoComponent } from './pages/mantenimientos/tipos-gasto.component';
import { RegistrosGastosComponent } from './pages/movimientos/registros-gastos/registros-gastos.component';
import { PresupuestoComponent } from './pages/movimientos/presupuesto/presupuesto.component';
import { DepositosComponent } from './pages/movimientos/depositos/depositos.component';
import { FondoMonetarioComponent } from './pages/mantenimientos/fondo-monetario.component';
import { GraficoComparativoComponent } from './pages/consultas-reportes/grafico-comparativo/grafico-comparativo.component';
import { ConsultaMovimientosComponent } from './pages/consultas-reportes/consulta-movimientos/consulta-movimientos.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'tipos-gasto', component: TiposGastoComponent },
      { path: 'consulta-movimientos', component: ConsultaMovimientosComponent },
      { path: 'grafico-comparativo', component: GraficoComparativoComponent },
      { path: 'fondo-monetario', component: FondoMonetarioComponent },
      { path: 'depositos', component: DepositosComponent },
      { path: 'presupuesto', component: PresupuestoComponent },
      { path: 'gastos', component: RegistrosGastosComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
