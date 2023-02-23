import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];

  constructor(
    private snackBar: MatSnackBar,
    private musicData: MusicDataService
  ) {}

  ngOnInit(): void {
    this.musicData.getFavourites().subscribe((data) => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(trackId: string) {
    this.musicData.removeFromFavourites(trackId).subscribe((data) => {
      this.snackBar.open("Removed from favourites.", "Done", { duration: 1000 });
      this.favourites = data.tracks;
    });
  }
}
