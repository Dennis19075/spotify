import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  state: string = 'paused';
  observerList: Array<Subscription> = [];

  constructor(
    public _multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {

    const observer$ = this._multimediaService.playerStatus$
      .subscribe(status => this.state = status);
    this.observerList.push(observer$);
    

    // const observable1$ = this._multimediaService.myObservable1$
    // .subscribe(
    //   (resOk) => { console.log("EL AGUA LLEGA BIEN! C: ", resOk);},
    //   (resFail) => {console.log("EL AGUA LLEGA MAL! :C ", resFail);}
    // )

    const observer1$: Subscription = this._multimediaService.callback.subscribe(
      (res: TrackModel) => {
        console.log('Getting the song...! ', res);
      }
    )
    this.observerList.push(observer1$);
  }

  handlePosition(event: MouseEvent): void {
    const elNative = HTMLElement = this.progressBar.nativeElement;
    const {clientX} = event;
    const {x, width} = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const progressBarX = (clickX*100) / width;
    this._multimediaService.seekAudio(progressBarX);
    console.log(`progressBarX ${progressBarX}`);
    
  }

  ngOnDestroy(): void {
    console.log("BOOM!");
    this.observerList.forEach(u => u.unsubscribe());
  }
}
