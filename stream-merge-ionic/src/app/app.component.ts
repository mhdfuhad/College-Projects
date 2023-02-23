import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  async ngOnInit() {
    this.storageService.getName().subscribe((name) => {
      if (name) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/onboarding']);
      }
    });
  }
}
