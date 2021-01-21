import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { ShareService } from './services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading: boolean;

  constructor(
    private shareService: ShareService,
  ){
  }

  ngOnInit(): void {
    this.shareService.output()
    .subscribe(cmd => {
      if(cmd == 'open-loading') {
        this.loading = true;
      } else if(cmd == 'close-loading') {
        this.loading = false;
      }
    })
  }
}
