import {Component} from '@angular/core';
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
  limitTo = this.resPerPage;
  limitFrom = 0;
  totalPages = 0;
  searchTerm: FormControl = new FormControl();
  selectedCategory: FormControl = new FormControl();
  categories: Category[] = [
    {value: 'business', viewValue: 'Business'},
    {value: 'entertainment', viewValue: 'Entertainment'},
    {value: 'general', viewValue: 'General'},
    {value: 'health', viewValue: 'Health'},
    {value: 'science', viewValue: 'Science'},
    {value: 'sports', viewValue: 'Sports'},
    {value: 'technology', viewValue: 'Technology'}
  ];


  constructor(private articleService: NewsService) {
    this.list();
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe(data => {
        this.articleService.suggest(data).subscribe(response => {
          this.articles = response.articles;
          this.totalPages = Math.ceil(this.articles.length / this.resPerPage);
          console.log(this.articles);
        });
      });
    this.selectedCategory.valueChanges
      .pipe(
        debounceTime(200)
      )
      .subscribe(data => {
        this.articleService.suggest(data).subscribe(response => {
          this.articles = response.articles;
          this.totalPages = Math.ceil(this.articles.length / this.resPerPage);
          console.log(this.articles);
        });
      });
  }

  list() {
    this.articleService.list()
      .subscribe(result => {
        this.articles = result.articles;
        this.totalPages = Math.ceil(this.articles.length / this.resPerPage);
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
