import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  page = 1;
  limit = 10;

  constructor(private postService: PostService) {
    this.list(this.page, this.limit);
  }

  list(page: number, limit: number) {
    this.postService.list(page, limit)
      .subscribe(posts => this.posts = posts);
  }

  getPreviousPage() {
    if (this.page > 1) {
      this.page -= 1;
      return this.page;
    }
  }

  getNextPage() {
    this.page += 1;
    return this.page;
  }

  ngOnInit() {
  }

}
