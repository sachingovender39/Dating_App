import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './ErrorPage/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [{path:'',component:HomeComponent},
{path:'messages',component:MessagesComponent, canActivate:[AuthGuard]},
{path:'members',component:MemberListComponent, canActivate:[AuthGuard]},
{path:'members/:id',component: MemberDetailComponent, canActivate:[AuthGuard]},
{path:'lists',component: ListsComponent,canActivate:[AuthGuard]},
{path:'server-error',component:ServerErrorComponent},
{path:'errors',component:TestErrorsComponent},
{
  path:'**',component:HomeComponent,pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
