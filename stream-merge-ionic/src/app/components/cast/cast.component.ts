import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent implements OnInit {
  @Input() actor: any;

  image: string;

  constructor() {}

  ngOnInit() {
    this.image =
      'https://image.tmdb.org/t/p/original' + this.actor.profile_path;
  }
}
