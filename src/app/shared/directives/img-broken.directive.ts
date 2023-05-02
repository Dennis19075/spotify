import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = '';
  @HostListener('error') handleError(): void {
    const native = this.host.nativeElement;
    console.log('this image is broken: ', native);
    // native.src = '../../../assets/images/logo-no-cover.png'
    native.src = this.customImg;
  }

  constructor(
    private host: ElementRef
  ) { 
    console.log("host: ", host);
    
  }

}
