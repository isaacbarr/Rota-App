import { BehaviorSubject, Observable } from "rxjs";

import { pluck } from 'rxjs/operators';

export interface State {
  date: Date,
  [key: string]: any;
}

const state: State = {
  date: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name))
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state,
    });
  }
}
