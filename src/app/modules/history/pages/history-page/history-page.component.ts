import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  resultList$: Observable<any> = of([]);

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  getSearchCallback(event: string) {
    this.resultList$ = this.searchService.searchTracks$(event);
  }

}
