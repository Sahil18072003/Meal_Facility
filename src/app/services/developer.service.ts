import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeveloperService {
  devloperInfo = [
    {
      id: 1,
      name: 'Sahil Dharaviya',
      role: 'Backend Web-developer',
      github: 'https://github.com/',
      linkedIn: 'https://www.linkedin.com/in/',
      instagram: 'https://www.instagram.com/',
      image: 'assets/Aboutus/1.jpg',
    },
    {
      id: 2,
      name: 'Pavan Jagadiawala',
      role: 'Frontend Web-developer',
      github: 'https://github.com/',
      linkedIn: 'https://www.linkedin.com/in/',
      instagram: 'https://instagram.com/',
      image: 'assets/Aboutus/2.jpg',
    },
    {
      id: 3,
      name: 'Kruta patel',
      role: 'Backend Web-developer',
      github: 'https://github.com/',
      linkedIn: 'https://www.linkedin.com/in/',
      instagram: 'https://www.instagram.com/',
      image: 'assets/Aboutus/3.jpg',
    },
    {
      id: 4,
      name: 'Harsh Talati',
      role: 'Frontend-developer',
      github: 'https://github.com/',
      linkedIn: 'https://www.linkedin.com/in/',
      instagram: 'https://www.instagram.com/',
      image: 'assets/Aboutus/4.jpg',
    },
    {
      id: 5,
      name: 'Nirav Tandel',
      role: 'Frontend Web-developer',
      github: 'https://github.com/',
      linkedIn: 'https://www.linkedin.com/in/',
      instagram: 'https://www.instagram.com/',
      image: 'assets/Aboutus/5.jpg',
    },
  ];

  getDevelopers() {
    return this.devloperInfo;
  }
}
