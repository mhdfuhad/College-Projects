import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  album: any;
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.musicData.getAlbumById(params.id).subscribe((data) => {
          this.album = data;
        });
    });
  }

  addToFavourites(trackId: string): void{
    this.musicData.addToFavourites(trackId).subscribe(
      (success) => {
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      (err) => {
        this.snackBar.open("Unable to add song to Favourites", "Done", { duration: 1500 });
      }
    );
  }
}
