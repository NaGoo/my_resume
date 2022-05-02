import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

interface MessageInterface {
  type: string;
  by?: 'customer' | 'bot';
  content?: string;
  cTime: Date;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})

export class ChatBotComponent implements OnInit {

  messages: MessageInterface[] | undefined;
  yourMessage = 'Type your message';
  inputText = '';


  constructor(
    private bottomSheetRef: MatBottomSheetRef<ChatBotComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  send(): void {
    console.log(this.messages?.slice(-1)[0].type);
    // if (this.messages?.slice(-1)[0].type === 'askMobile') {
    //   this.messages?.push({ type: 'mobile', by: 'customer', content: this.inputText, cTime: new Date() });
    //   this.sendOtp(this.inputText);
    // } else if (this.messages?.slice(-1)[0].type === 'otpSent') {
    //   this.messages?.push({ type: 'verifyOTP', by: 'customer', content: this.inputText, cTime: new Date() });
    //   this.verifyOTP(this.inputText);
    // }
    this.inputText = '';
  }

  close(){
    this.bottomSheetRef.dismiss();
  }

}
