import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  results: any;
  searchQuery: string = "";

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
      
      this.musicData.searchArtists(this.searchQuery).subscribe(data => {
        this.results = data.artists.items.filter((x:any)=>x.images.length > 0);
      });
    });
  }

}
