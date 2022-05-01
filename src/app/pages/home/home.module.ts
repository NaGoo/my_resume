import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {homeRouting} from "./home.route";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    homeRouting,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class HomeModule { }
