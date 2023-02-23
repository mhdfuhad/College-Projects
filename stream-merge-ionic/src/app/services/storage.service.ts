/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storageReady = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();

    this.storageReady.next(true);
  }

  getName() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.get('name')) || of(''))
    );
  }

  setName(name: string) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.set('name', name)))
    );
  }

  getCountry() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.get('country')) || of(''))
    );
  }

  setCountry(country: string) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.set('country', country)))
    );
  }

  getSubscriptions() {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.get('subscriptions')) || of([]))
    );
  }

  setSubscriptions(subscriptions: string[]) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.set('subscriptions', subscriptions)))
    );
  }

  saveToList(listName: string, objectArray: any) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.set(listName, objectArray)))
    );
  }

  getList(listName: string) {
    return this.storageReady.pipe(
      filter((ready) => ready),
      switchMap((_) => from(this.storage.get(listName)))
    );
  }
}
