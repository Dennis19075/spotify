import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map((({data}: any )=> {
          return data
        }))
      )
  }

  getAllRandomTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`)
      .pipe(
        mergeMap((({data}: any )=> this.skipById(data, 1))),
        // map((({dataReversed}: any )=> {
        //   return dataReversed.filter((track: TrackModel) => track._id !== 1)
        // })),
        tap(data => console.log(data)),
        catchError((err)=>{
          const {status, statusText} = err
          console.log("Something went wrong! ", [status, statusText]);
          
          return of([])
        })
      )
  }

  private skipById(trackList: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = trackList.filter(a => a._id !== id)
      resolve(listTmp)
    })
  }
}
