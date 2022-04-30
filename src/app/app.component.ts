import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';

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

  constructor(public el: ElementRef<HTMLElement>) {
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
