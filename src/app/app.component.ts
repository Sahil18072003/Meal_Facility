import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Meal_Facility';

  isRouteDataHidden: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let currentRoute: any = this.router.routerState.root; // Explicitly typing as 'any'
        let hideHeaderFooter = false;
        while (currentRoute) {
          const { routeConfig } = currentRoute;
          if (
            routeConfig &&
            routeConfig.data &&
            routeConfig.data['hideHeaderFooter'] // Access using index signature notation
          ) {
            hideHeaderFooter = true;
            break;
          }
          currentRoute = currentRoute.firstChild
            ? currentRoute.firstChild
            : null;
        }
        this.isRouteDataHidden = hideHeaderFooter;
      }
    });
  }
}
