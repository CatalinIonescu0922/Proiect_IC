import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { RegisterNowComponent } from './register-now/register-now.component';
import { MakeFriendsComponent } from './make-friends/make-friends.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path : "" , component : HomeComponentComponent},
    {path : "login" , component : LoginComponent},
    {path: "login", children :[{path: "registerNow", component : RegisterNowComponent}]},
    {path: "makeFriends", component: MakeFriendsComponent},
    {path: "profile", component: ProfileComponent}
];
