import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {homeRouting} from "./home.route";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ChatBotComponent} from "../chat-bot/chat-bot.component";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent,
    ChatBotComponent
  ],
  imports: [
    CommonModule,
    homeRouting,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatBottomSheetModule,
    FormsModule
  ]
})
export class HomeModule { }
