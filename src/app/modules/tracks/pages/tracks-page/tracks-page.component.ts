import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css'],
})
export class TracksPageComponent implements OnInit, OnDestroy {
  observerList$: Array<Subscription> = [];

  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.initRequest();
  }

  initRequest() {
    this.loadAllData();
    this.loadRandomData();
  }

  loadAllData(): void {
    this.trackService.getAllTracks$().subscribe((res: TrackModel[]) => {
      this.tracksRandom = res;
      this.tracksTrending = res;
      console.log('res: ', res);
    }, err => {
      console.log("Connection error!");
      
    });
  }

  loadRandomData(): void {
    this.trackService.getAllRandomTracks$().subscribe(
          (res:TrackModel[]) => {
            this.tracksRandom = res;
            console.log("res random: ", res);
          });
  }

  ngOnDestroy(): void {}
}
