import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        data: {},
        loadChildren: () => import('./pages/home/home.module').then(module => module.HomeModule)
      },
      {
        path: 'my-recipes',
        data: {},
        loadChildren: () => import('./pages/my-recipes/my-recipes.module').then(module => module.MyRecipesModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
