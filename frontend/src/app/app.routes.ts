import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PrediccionVinoComponent } from './components/prediccion-vino/prediccion-vino.component';
import { VinosSimilaresComponent } from './components/vinos-similares/vinos-similares.component';
import { DistribucionCalidadComponent } from './components/distribucion-calidad/distribucion-calidad.component';
import { RelacionesCalidadComponent } from './components/relaciones-calidad/relaciones-calidad.component';
import { CaracteristicaVsCalidadComponent } from './components/caracteristica-vs-calidad/caracteristica-vs-calidad.component';
import { MapaCalorComponent } from './components/mapa-calor/mapa-calor.component';
import { ImportanciaCaracteristicasComponent } from './components/importancia-caracteristicas/importancia-caracteristicas.component';
import { ExplicacionPrediccionComponent } from './components/explicacion-prediccion/explicacion-prediccion.component';
import { MatrizCorrelacionComponent } from './components/matriz-correlacion/matriz-correlacion.component';
import { EstadisticasDatasetComponent } from './components/estadisticas-dataset/estadisticas-dataset.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, },    
    {
        path: '', component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },                       
            { path: 'prediccion-vino', component: PrediccionVinoComponent, canActivate: [AuthGuard] }, 
            { path: 'vinos-similares', component: VinosSimilaresComponent, canActivate: [AuthGuard] }, 
            { path: 'distribucion-calidad', component: DistribucionCalidadComponent, canActivate: [AuthGuard] }, 
            { path: 'relaciones-calidad', component: RelacionesCalidadComponent, canActivate: [AuthGuard] }, 
            { path: 'caracteristica-vs-calidad', component: CaracteristicaVsCalidadComponent, canActivate: [AuthGuard] }, 
            { path: 'mapa-calor', component: MapaCalorComponent, canActivate: [AuthGuard] }, 
            { path: 'importancia-caracteristicas', component: ImportanciaCaracteristicasComponent, canActivate: [AuthGuard] }, 
            { path: 'explicacion-prediccion', component: ExplicacionPrediccionComponent, canActivate: [AuthGuard] }, 
            { path: 'matriz-correlacion', component: MatrizCorrelacionComponent, canActivate: [AuthGuard] }, 
            { path: 'estadisticas-datasets', component: EstadisticasDatasetComponent, canActivate: [AuthGuard] }, 
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }];
