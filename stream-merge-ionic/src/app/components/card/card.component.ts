import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() content: any;
  @Input() edit: boolean;

  @Output() removeCurrent: EventEmitter<number> = new EventEmitter();

  item: any;
  image: string;
  type: string;

  constructor(private router: Router) {}

  ngOnInit() {
    this.item = this.content;

    this.image = 'https://image.tmdb.org/t/p/original' + this.item.posterPath;
    this.type = this.item.episodes ? 'Series' : 'Movie';
  }

  cardClicked() {
    this.router.navigate(['/details', this.item.id, this.type.toLowerCase()]);
  }

  remove() {
    this.removeCurrent.emit(this.item.id);
  }
}
