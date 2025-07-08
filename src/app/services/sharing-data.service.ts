import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idUserEventemitter = new EventEmitter();

  private _selectdUserEventEmitter = new EventEmitter();

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();

  private _finUserByIdEvnetEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  constructor() { }

  get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }

  get findUserByIdEventEmitter() {
    return this._finUserByIdEvnetEmitter;
  }
 
  get newUserEventEmitter(): EventEmitter<User> {
    return this._newUserEventEmitter;
  }

  get idUserEventEmitter(): EventEmitter<number> {
    return this._idUserEventemitter;
  }

  get selectdUserEventEmitter(): EventEmitter<User> {
    return this._selectdUserEventEmitter;
  }
}
