import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe-model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  recipeId!: string;

  constructor(private rSvc: RecipeService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipeId = this.actRoute.snapshot.params['recipeId']
    this.rSvc.getRecipe(this.recipeId)
      .then(recipe => this.recipe = recipe as Recipe)
      .catch(error => alert(error.error))
  }

}
