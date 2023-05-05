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
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject("-00:00");
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject("paused");
  public playerProgressBar$: BehaviorSubject<number> = new BehaviorSubject(0);

  // myObservable1$: Subject<any> = new Subject();
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('🌊🌊🌊🌊');

  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe(resOk => {
      if (resOk) {
        this.setAudio(resOk);
      }
      
      this.listenAllEvents();
      
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

  private listenAllEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = () => {
    const {duration, currentTime} = this.audio;
    // console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setProgressBar(currentTime, duration);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) { //TODO: state --> playing
      case 'play':
        this.playerStatus$.next("play")
        break;
      case 'playing':
        this.playerStatus$.next("playing")
        break;
      case 'ended':
        this.playerStatus$.next("ended")
        break;
      default:
        this.playerStatus$.next("paused");
        break;
    }
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime/60)%60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, totalTime: number): void {
    // timeRemaining
    let timeLeft = totalTime - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft/60)%60);
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  public setAudio(track: TrackModel): void{
    console.log('desde el service ', track);
    this.audio.src = track.url;
    this.audio.play();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  private setProgressBar(currentTime: number, duration: number): void {
    let progress = (currentTime * 100) / duration;
    this.playerProgressBar$.next(progress);
  }

  public seekAudio(progressBar: number): void {
    const {duration} = this.audio;
    const progressToSecond = (progressBar * duration)/100;
    this.audio.currentTime = progressToSecond;
    
  }
}
