import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../chatService/chat.service";

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

  @ViewChild('scrollMe') private myScrollContainer: any;
  inputText = '';
  messages = [
    {msg: 'hello', isMe: true}
  ];
  today: any;
  chatForm: FormGroup;
  msgs: any = [];
  isEnable = false;


  constructor(
    private bottomSheetRef: MatBottomSheetRef<ChatBotComponent>,
    public readonly fb : FormBuilder,
    public readonly chatService : ChatService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.chatForm = this.fb.group({
      msg: ['']
    });
    const a = new Date().getHours();
    this.chatService.messages.next([{isMe: true, msg: `${a < 12 ? 'Good Morning!': a < 18 ? 'Good Afternoon' : 'Good Evening'}, how can I help you?`, time: ''}]);
  }

  ngOnInit(): void {
    this.chatService.messages.subscribe((m: any) => {
      this.msgs = m;
    });
    this.today = new Date();
    this.scrollToBottom();
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    const text = this.chatForm.get('msg')?.value
    if (this.chatForm.get('msg')?.value) {
      this.msgs.push({isMe: false, msg: this.chatForm.get('msg')?.value, time: this.today});
      if (text.length > 20) {
        this.msgs.push({isMe: true, msg: 'SORRY!, I dont get it.', time: this.today});
      } else {
        if (text.includes('fuck') || text.includes('love') || text.includes('ex')) {
          this.assignMessage('SORRY!, I dont have answer for that...', false);
        } else if (text.includes('bye') || text.includes('get lost')) {
          this.assignMessage('Ok, Bye.', false);
        } else if (text.includes('sorry') || text.includes('sry') || text.includes('Sorry') || text.includes('SORRY')) {
          this.assignMessage('hmm.', false);
        } else if (text.includes('thanks') || text.includes('thank you') || text.includes('tq')) {
          this.assignMessage('My pleasure.', false);
        } else if (text.includes('@gmail') || text.includes('@yahoo')) {
          this.assignMessage('I will never share your email with anyone else.', false);
        } else if (
          text.includes('0') || text.includes('1') || text.includes('2') ||
          text.includes('3') || text.includes('4') || text.includes('5') ||
          text.includes('6') || text.includes('7') || text.includes('8') ||
          text.includes('9')
        ) {
          this.assignMessage('I will never share this number with anyone else.', false);
        } else if (text.includes('hi') || text.includes('Hi')) {
          this.assignMessage('Hi there, Im ChatBot version0.1', false);
          this.assignMessage('how can I help you?', false);
        } else if (text.includes('hello') || text.includes('Hello')) {
          this.assignMessage('Hello, Im ChatBot version0.1', false);
          this.assignMessage('how can I help you?', false);
        } else if (text.includes('nothing') || text.includes('no need') || text.includes('no') || text.includes('No')) {
          this.assignMessage('Okay then, Bye Take Care.', true);
        }else if (text.includes('ok') || text.includes('Ok') || text.includes('OK') || text.includes('Okay') || text.includes('okay')) {
          this.assignMessage('Okay.', false);
          this.assignMessage('how can I help you?', false);
        }

        else {
          this.assignMessage('SORRY!, I dont get it properly.', true);
        }
      }

      this.chatService.messages.next(this.msgs);
      this.chatForm.patchValue({msg: ''});
    }
  }
  assignMessage(msg: any, close: boolean) {
    this.isEnable = true;
    setTimeout(() => {
      this.msgs.push({isMe: true, msg , time: this.today});
      this.isEnable = false;
      if (close) {
        this.closeSheet();
      }
    }, 2000);
  }

  closeSheet() {
    if (!this.chatForm.get('msg')?.value) {
      setTimeout(() => {
        this.bottomSheetRef.dismiss();
      }, 2000);
    }
  }

  callFunction(ev: any) {
    if (ev.key === 'Enter') {
      this.sendMessage();
    }
  }

  close(){
    this.bottomSheetRef.dismiss();
  }

}
