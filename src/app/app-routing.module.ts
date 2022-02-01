import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./views/game/game.module').then((module) => module.GameModule), 
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
