import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { UsersComponent } from './components/users/users.component';
  import { AddUserComponent } from './components/users/add-user/add-user.component';
  import { EditUserComponent } from './components/users/edit-user/edit-user.component';
  import { ListsUserComponent } from './components/users/lists-user/lists-user.component';
import { UsersService } from './services/users.service';
import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children : [
      {
        path: '',
        redirectTo: 'lists',
        pathMatch: 'full'
      },
      {
        path: 'lists',
        component: ListsUserComponent,
      },
      {
        path: 'new',
        component: AddUserComponent,
      },
      {
        path: 'edit',
        component: EditUserComponent,
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AddUserComponent,
    EditUserComponent,
    ListsUserComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    // HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UsersService,
     DataService,
     HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
