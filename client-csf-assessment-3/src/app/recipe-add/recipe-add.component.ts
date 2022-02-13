import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from '../recipe-model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  recipeForm!: FormGroup;
  ingArr = this.fb.array([
    this.fb.control('', [Validators.minLength(3)])
  ], Validators.required);
  recipe!: Recipe;

  constructor(private fb: FormBuilder, private router: Router, private rSvc: RecipeService) { }

  ngOnInit(): void {
    this.createRecipeForm();
  }

  createRecipeForm() {
    this.recipeForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', [Validators.required]),
      ingredients: this.ingArr,
      instruction: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  addIngredient() {
    this.ingArr.push(
      this.fb.control('', [Validators.minLength(3)])
    );
  }

  removeIngredient(index: number) {
    this.ingArr.removeAt(index);
  }

  back() {
    this.router.navigate(['/'])
  }

  addRecipe() {
    const newRecipe: Recipe = this.recipeForm.value as Recipe;
    newRecipe.id = "";
    this.rSvc.addRecipe(newRecipe)
      .then()
    this.back();
  }

}
