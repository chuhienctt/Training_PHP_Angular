import { Component, ElementRef, Injector, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { ShareService } from './libs/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public _renderer: any;
  loading:boolean;

  constructor(
    injector: Injector,
    private shareService: ShareService,
    private router: Router,
    private el: ElementRef,
    ) {
      this._renderer = injector.get(Renderer2);

      router.events.subscribe((event: RouterEvent) => {
        if(event instanceof NavigationStart) {
          this.el.nativeElement.querySelector('#uptop').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
          this.loading = true;
        } else if(event instanceof NavigationEnd) {
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      })

  }

  ngOnInit(): void {
    this.renderExternalScript('assets/js/main.js').onload = () => {}

    this.shareService.output()
    .subscribe(cmd => {
      if(cmd == 'open-loading') {
        this.loading = true;
      } else if(cmd == 'close-loading') {
        this.loading = false;
      }
    })
  }

  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    script.className = "script";
    this._renderer.appendChild(document.body, script);
    return script;
  }
}