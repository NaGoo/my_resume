import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  isGradientVisible = false;
  gradientTop: number | undefined;
  gradientRadius: number | undefined;
  gradientLeft: number | undefined;

  mailForm: FormGroup;

  constructor(public el: ElementRef<HTMLElement>,
              public readonly fb: FormBuilder,
              public readonly matSnackBar: MatSnackBar,
  ) {
    this.mailForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isGradientVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isGradientVisible = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.gradientLeft = event.pageX - this.el.nativeElement.offsetLeft;
    this.gradientTop = event.pageY - this.el.nativeElement.offsetTop;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.gradientRadius = 100;
  }

  sendMail() {
    if (this.mailForm.get('name')?.value && this.mailForm.get('mobile')?.value && this.mailForm.get('subject')?.value && this.mailForm.get('message')?.value) {
      window.location.href = 'mailto:nagucse05@gmail.com?subject=' + `${this.mailForm.get('subject')?.value}` +
        '&body=' + `Hi, Im ${this.mailForm.get('name')?.value} ${this.mailForm.get('message')?.value} ,Please contact me on ${this.mailForm.get('mobile')?.value}`;
    } else {
      this.matSnackBar.open('Please fill all the details', '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: 'alert'
      });
    }
  }

  get gradientStyle() {
    const top = this.gradientTop;
    const left = this.gradientLeft;
    const gradientRadius = this.isGradientVisible ? this.gradientRadius : 0;

    return {
      'height.px': gradientRadius,
      'width.px': gradientRadius,
      'top.px': top,
      'left.px': left
    };
  }
}
