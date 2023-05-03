import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;

  // myObservable1$: Subject<any> = new Subject();
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('🌊🌊🌊🌊');

  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(resOk => {
      if (resOk) {
        this.setAudio(resOk);
      }
      
      
    })
    // setTimeout(() => {
    //   this.myObservable1$.next('🌊🌊🌊🌊')
    // }, 1000);
  //   this.myObservable1$ = new Observable(
  //     (observer: Observer<any>) => {
  //       observer.next('🌂🌂🌂🌂')

  //       setTimeout(() => {
  //         observer.complete()
  //       }, 2500);

  //       setTimeout(() => {
  //         observer.error('🌂🌂🌂🌂')
  //       }, 3000);
  //     }
  //   )
  }

  public setAudio(track: TrackModel): void{
    console.log('desde el service ', track);
    this.audio.src = track.url;
    this.audio.play();
  }
}
