import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';

const contentRouting = RouterModule.forChild([
  { path: '', component: HomeComponent }
]);

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    contentRouting,
  ]
})
export class ContentModule { }
