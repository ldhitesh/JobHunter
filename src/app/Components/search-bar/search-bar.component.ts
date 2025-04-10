import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
    standalone: false
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  public searchstring:string="";

  onSearch(): void {
    
    this.search.emit(this.searchstring);
  }

}
