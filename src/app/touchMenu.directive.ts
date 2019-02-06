import {Directive, ElementRef, Renderer2, HostListener, Input, DoCheck} from '@angular/core';

@Directive({
  selector: '[appTouchMenu]'
})
export class TouchMenuDirective implements DoCheck {
  @Input()public changeColor: number;
  public color = 'white';
  constructor(private elementRef: ElementRef, private render: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.color = '#d2d4ce';
    this.setBackGround('#d2d4ce');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.color = 'white';
    this.setBackGround('white');
  }

  private setBackGround(val: string) {
    this.render.setStyle(this.elementRef.nativeElement, 'background', val);
  }
  ngDoCheck(): void {
    if (this.changeColor !== 0) {
      this.render.setStyle(this.elementRef.nativeElement, 'background', 'black');
    } else {
      this.render.setStyle(this.elementRef.nativeElement, 'background', this.color);
    }
  }
}
