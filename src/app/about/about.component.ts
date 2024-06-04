import { Component, OnInit } from '@angular/core';
import { DeveloperService } from './../services/developer.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  developers: any[];

  constructor(private developerService: DeveloperService) {
    this.developers = this.developerService.getDevelopers();
  }

  ngOnInit(): void {}
}
