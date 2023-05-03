import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() outputCallbackData:EventEmitter<any> = new EventEmitter();

  src: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  changeSearch(eventSearch: any): void {
    if(eventSearch.length >= 3) {
      console.log("evento search: ", eventSearch);
      this.outputCallbackData.emit(eventSearch);
    }
    
  }

}
