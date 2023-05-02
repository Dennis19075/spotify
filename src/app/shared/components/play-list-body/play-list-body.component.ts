import { Component, OnInit } from '@angular/core';

import * as dataRaw from '../../../data/tracks.json'
import { TracksModule } from '@modules/tracks/tracks.module';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit {

  tracks: Array<any> = []
  optionSort: {property:string|null, order: string} =  {property: null, order:'asc'}

  constructor() { }

  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default;
    console.log("data: ", data);
    
    this.tracks = data;
  }


  changeSort(property: string): void {
    const  { order } = this.optionSort;

    this.optionSort = {
      property,
      order: order==='asc' ? 'desc': 'asc'
    }

    console.log("optionSort ", this.optionSort);
    
  }
}
