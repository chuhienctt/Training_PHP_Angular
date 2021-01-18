import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
    private messageSource = new BehaviorSubject('init');
    private currentMessage = this.messageSource.asObservable();

    constructor() { }

    input(cmd) {
        this.messageSource.next(cmd);
    }

    output() {
        return this.currentMessage;
    }

    openLoading() {
        this.input('open-loading');
    }

    closeLoading() {
        this.input('close-loading');
    }

}
