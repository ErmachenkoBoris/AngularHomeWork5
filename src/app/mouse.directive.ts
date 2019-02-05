import {Directive, ElementRef, Renderer2, HostListener, Input, DoCheck, OnInit} from '@angular/core';
import {InitialInputData} from '@angular/core/src/render3/interfaces/node';

@Directive({
  selector: '[appMouse]'
})
export class MouseDirective implements DoCheck, OnInit {
  public scaleX = 0;
  public scaleY = 0;
  public centerX = 0;
  public centerY = 0;
  @Input() public width: number;
  @Input()public length: number;
  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    // console.log(this.length);
    // console.log(this.width);
   //  console.log(event.clientY);
    // console.log(event.clientY);
    this.setBackGround(event.clientX, event.clientY);
  }

  private setBackGround(valX: number, valY: number) {
    let mainSkale = 0;
    if (this.scaleX >= this.scaleY) {
      mainSkale = this.scaleX;
    } else {
      mainSkale = this.scaleY;
    }
    const col = 255 - Math.sqrt((this.centerX - valX) * (this.centerX - valX) + (this.centerY - valY) * (this.centerY - valY) ) / mainSkale;
    const col2 = 325 - col;
    this.render.setStyle(this.elementRef.nativeElement, 'background', `rgb(${col},${col },
    ${col})`);
    this.render.setStyle(this.elementRef.nativeElement, 'color', `rgb(${col2},${col2 },
    ${col2})`);
  }
  ngDoCheck(): void {
    this.scaleX = this.width / 255;
    this.scaleY = this.length / 255;
    this.centerX = this.width / 2;
    this.centerY = this.length / 2;
    console.log(this.scaleX );
    console.log(this.scaleY );
  }
  ngOnInit(): void {
    this.scaleX = this.width / 255;
    this.scaleY = this.length / 255;
    this.centerX = this.width / 2;
    this.centerY = this.length / 2;
    console.log(this.scaleX );
    console.log(this.scaleY );
  }
}
