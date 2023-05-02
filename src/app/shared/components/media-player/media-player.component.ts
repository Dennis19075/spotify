import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  mockCover: TrackModel = {
    cover: 'https://f4.bcbits.com/img/a4118357838_16.jpg',
    album: 'sat leuv om',
    name: 'ajna',
    url: 'https://localhost/track.1',
    _id: '1'
  }

  observerList: Array<Subscription> = [];

  constructor(
    private _multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {

    const observer1$: Subscription = this._multimediaService.callback.subscribe(
      (res: TrackModel) => {
        console.log('Getting the song...! ', res);
      }
    )
    this.observerList.push(observer1$);
  }

  ngOnDestroy(): void {
    console.log("BOOM!");
    this.observerList.forEach(u => u.unsubscribe());
  }
}
