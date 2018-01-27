import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { LoginComponent } from './components/login/login.component';
import { ResetComponent } from './components/reset/reset.component';
import { RegisterComponent } from './components/register/register.component';

/**
 * Paths will look to the end user as follow:
 * domainName/login -> loads the login components
 * domainName/login/reset -> loads the reset password component
 * Suggestion:
 * domainName/auth/login -> loads the login components
 * domainName/auth/reset -> loads the reset password component
 * domainName/auth/regester -> loads the regester (or move regester to the home module as it is not related to authentication)
 */
const authRoutes: Routes = [

    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'reset',
                component: ResetComponent
            },
            {
                path: 'register', // should we include it in another module?
                component: RegisterComponent
            }
        ]
    }

];

export const authRouting = RouterModule.forChild(
    authRoutes
);
