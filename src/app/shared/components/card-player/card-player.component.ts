import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input() mode: 'small' | 'big' = 'small';
  @Input() track: TrackModel = {
    _id: '',
    name: '',
    album: '',
    cover: '',
    url: ''
  };

  constructor(
    private _multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {
  }

  sendPlay(track: TrackModel): void {
    console.log("Sending a song to the player, ", track);
    
    this._multimediaService.callback.emit(track);
  }

}
