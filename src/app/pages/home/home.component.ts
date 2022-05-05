// @ts-ignore

import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ChatBotComponent} from "../chat-bot/chat-bot.component";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  visible = false;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef | undefined;

  constructor(
    private readonly matBottomSheet: MatBottomSheet,
  ) {
  }

  openChatBot(): void {
    this.matBottomSheet.open(ChatBotComponent, {
      disableClose: false,
      panelClass: 'bot'
    });
  }

  downloadAsPDF(id: any) {
    let data: any = document.getElementById(id);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('portrait', 'px', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      const top_left_margin = 15;
      const PDF_Width: any  = width + (top_left_margin * 2);
      const PDF_Height: any = (PDF_Width * 1.5) + (top_left_margin * 2);

      const totalPDFPages = Math.ceil(height / PDF_Height) - 1;

        // for (let i = 1; i <= totalPDFPages; i++) {
        //   pdf.addPage(PDF_Width, PDF_Height);
        //   pdf.addImage(contentDataURL, 'PNG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),width,height);
        // }
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('nagarajan-resume.pdf');
    });

  }
}
