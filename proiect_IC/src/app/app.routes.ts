import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './login/login.component';
import { RegisterNowComponent } from './register-now/register-now.component';
import { ProfileComponent } from './profile/profile.component';
import { GymsComponent } from './gyms/gyms.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { GymUsersComponent } from './gym-users/gym-users.component';
import { GymMembersComponent } from './gym-members/gym-members.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';

export const routes: Routes = [
  { path: "", component: HomeComponentComponent },
  { path: "login", component: LoginComponent },
  { path: "register-now", component: RegisterNowComponent },
  { path: "makeFriends", component: FindFriendsComponent },
  { path: "profile", component: ProfileComponent },
  {path: "gyms",component:GymsComponent} ,
  {path : "gyms/:id",component:GymUsersComponent},
  { path: "about-us",component:AboutUsComponent},
  { path: 'gyms/:gymID/members', component: GymMembersComponent }

];
