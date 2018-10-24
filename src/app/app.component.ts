import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router, Routes} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user = {
    name: 'Lara',
    surname: 'Croft',
    profileImage: 'lara.png',
    wallPaperImage: 'bg.jpg'
  };

  navLinks: Routes;
  public activeLink;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private  router: Router) {
    this.navLinks = this.router.config;
    this.activeLink = this.router.config[0];
  }
}
