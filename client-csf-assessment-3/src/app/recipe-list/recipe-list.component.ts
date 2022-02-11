import { Component, OnInit } from '@angular/core';

import { Recipe, RecipeSummary } from '../recipe-model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: RecipeSummary[] = [];

  constructor(private rSvc: RecipeService) { }

  ngOnInit(): void {
    this.rSvc.getAllRecipes()
      .then(recipes => this.recipes = recipes as RecipeSummary[]);
  }

}
