import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDatailComponent } from './users/user-datail/user-datail.component';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        {path: 'users', component: UserListComponent},
        {path: 'users/:id', component: UserDatailComponent},
        {path: 'likes', component: LikesComponent },
        {path: 'messages', component: MessagesComponent},
    ]
},

    {path: '**', redirectTo: '', pathMatch: 'full'} ,
];
