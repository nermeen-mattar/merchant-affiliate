import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { RegisterComponent } from './register/register.component';

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
                path: 'register',
                component: RegisterComponent
            }
        ]
    }

];

export const authRouting = RouterModule.forChild(
    authRoutes
);
