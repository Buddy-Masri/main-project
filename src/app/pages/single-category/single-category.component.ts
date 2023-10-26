import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  category: string;
  categoryData: Array<object>;
  categoryDesc: string;

  constructor(
    private params: ActivatedRoute,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.params.paramMap.subscribe((value) => {
      this.category = value.get('name');
      this.params.queryParamMap.subscribe((desc) => {
        this.categoryDesc = desc.get('description');
      });
      this.categoryService.loadSingleCat(this.category).subscribe((data) => {
        this.categoryData = data;
      });
    });
  }

}

