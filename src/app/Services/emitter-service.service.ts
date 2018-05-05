import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class EmitterService {
  private _subject = new Subject<any>();

  breweryBeersEvent(id) {
    this._subject.next(id);
  }

  get events$ () {
    return this._subject.asObservable();
  }
}
