import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './components/about/about.component';
import {LandingComponent} from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
    data: {
      state: 'home',
      slug: 'Home'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full',
    data: {
      state: 'about',
      slug: 'about'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
