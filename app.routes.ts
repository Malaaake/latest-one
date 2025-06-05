import { RouterModule, Routes } from '@angular/router';
import { CreatorComponent } from './creator/creator.component';
import { ExamComponent } from './exam/exam.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MakequizComponent } from './makequiz/makequiz.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { AdminComponent } from './admin/admin.component';
import { ListComponent } from './creator/list/list.component';
import { AdminGuard } from './login/admin.guard';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }, 
  { path: 'makequiz', component: MakequizComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  {path: "creator",component:CreatorComponent},
  {path: "exam",component:ExamComponent},
  {path: 'questin', component: QuestionComponent},
  {path: '**', redirectTo: 'home' } ,
  {path: 'navbar', component: NavbarComponent}, 
  {path: 'footer', component: FooterComponent},
 // {path : 'admin', component: AdminComponent},
  { path: 'admin', canActivate: [AdminGuard], children: [{ path: 'creators', component: ListComponent }]},
  { path: 'creator/list', component: ListComponent }

];

@NgModule({
 
    imports: [BrowserModule,
        ReactiveFormsModule,RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }