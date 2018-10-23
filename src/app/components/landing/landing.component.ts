import {Component, OnInit} from '@angular/core';
import {Article} from '../../models/article.model';
import {NewsService} from '../../services/news.service';
import {debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

export interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  articles: Article[];
  page = 1;
  resPerPage = 6;
  limitTo = 6;
  limitFrom = 0;
  totalPages = 0;
  searchTerm: FormControl = new FormControl();
  searchResult = [];
  selectedCategory;
  categories: Category[] = [
    {value: 'general', viewValue: 'General'},
    {value: 'business', viewValue: 'Business'},
    {value: 'entertainment', viewValue: 'Entertainment'}
  ];

  constructor(private articleService: NewsService) {
    this.list();
    // this.selectedCategory.valueChanges
    //   .pipe(
    //     debounceTime(200)
    //   )
    //   .subscribe(data => {
    //     this.articleService.suggest(data).subscribe(response => {
    //       this.searchResult = response;
    //     });
    //   });
  }


  getTotalPages(length, resPerPage) {
    this.totalPages = Math.ceil(length / resPerPage);
    return this.totalPages;
  }

  list() {
    this.articleService.list()
      .subscribe(result => {
        this.articles = result.articles;
      });
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.limitTo = this.page * this.resPerPage;
      this.limitFrom -= this.resPerPage;
    }
  }

  nextPage() {
    this.page += 1;
    this.limitTo = this.page * this.resPerPage;
    this.limitFrom += this.resPerPage;
  }
}
