import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  artist: any;
  albums: any;

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.musicData
        .getArtistById(params.id)
        .subscribe((data: any) => {
          this.artist = data;
        });

      this.musicData
        .getAlbumsByArtistId(params.id)
        .subscribe((data: any) => {
          this.albums = data.items.filter(
            (curValue: any, index: any, self: any) =>
              self.findIndex(
                (t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()
              ) === index
          );
        });
    });
  }
}
