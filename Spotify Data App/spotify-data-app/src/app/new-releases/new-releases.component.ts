import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit{

  show: Boolean = false;
  releases: any;

  constructor(private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.musicData.getNewReleases().subscribe((data: any) => {
      this.releases = data.albums.items;
    });
  }
}
