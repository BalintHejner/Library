import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { MemberComponent } from './components/member/member.component';
import { NewMemberComponent } from './components/new-member/new-member.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-search', component: BookSearchComponent},
  {path: 'members', component: MemberComponent},
  {path: 'new-member', component: NewMemberComponent},
  {path: 'login', component: LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
