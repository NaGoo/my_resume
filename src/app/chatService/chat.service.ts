import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: BehaviorSubject<any> = new BehaviorSubject<any>([{isMe: true, msg: 'Hello!, how can i help you?', time: ''}]);
}
