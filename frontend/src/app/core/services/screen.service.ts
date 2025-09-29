import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
//import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  largeBreakPoint = 800;
  screenWidth = 1000;
  screenHeight = 800;
  offsetHeight = 0;
  contentHeight = 0;
  contentWidth = 0;
  offsetVisor = 40;
  private resizeSource = new Subject<null>();
  resize$ = this.resizeSource.asObservable();
  private resizeContent = new Subject<null>();
  resizeContent$ = this.resizeContent.asObservable();

  constructor() {
    try {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      this.contentHeight = this.screenHeight - this.offsetVisor;
      this.contentWidth = this.screenWidth;
      // logger.trace(` constructor window.innerHeight = ${this.screenHeight.toString()}`);
      window.addEventListener('resize', (event) => this.onResize(event));
      window.addEventListener('resize', (event) => this.onResizeContent(event));
    } catch (e) {
      // we are going with default screen dimensions
    }
  }

  isLarge(): boolean {
    return this.screenWidth >= this.largeBreakPoint;
  }

  onResize($event: any): void {
    this.screenHeight = window.innerHeight;
    this.contentHeight = this.screenHeight - this.offsetVisor;
    //this.logger.trace(` onResize window.innerHeight = ${this.screenHeight.toString()}`);
    //this.logger.trace(` onResize contentHeight = ${this.contentHeight.toString()}`);
    this.screenWidth = window.innerWidth;
    this.contentWidth = this.screenWidth;
    this.resizeSource.next(null);
  }

  onResizeContent($event: any): number {
    this.contentHeight = this.screenHeight - this.offsetVisor;
    this.contentWidth  = this.screenWidth;
    return this.contentHeight;
  }
}
