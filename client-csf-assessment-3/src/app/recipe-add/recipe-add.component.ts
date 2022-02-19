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
  recipe!: Recipe;

  // For Dynamic display of ingredients
  ingArr!: FormArray;

  // For Static display of ingredients
  ingList: string[] = [];
  ingGrp!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private rSvc: RecipeService) { }

  ngOnInit(): void {
    this.createRecipeForm();
  }

  createRecipeForm() {
    this.recipeForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', [Validators.required]),

      // For Dynamic display of ingredients
      /*       
      ingredients: this.ingArr = this.fb.array([
        this.fb.control('', Validators.minLength(3))
      ]),
      */

      // For Static display of ingredients
      ingredients: this.ingGrp = this.fb.group({
        ingredient: this.fb.control('', [Validators.minLength(3)])
      }),

      instruction: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  addIngredient() {
    // For Dynamic display of ingredients
    /* 
    this.ingArr.push(
      this.fb.control('', [Validators.minLength(3)])
    );
    */    

    // For Static display of ingredients
    const ing = this.ingGrp.get('ingredient') as FormControl;
    this.ingList.push(ing.value);
    this.ingGrp.reset();
  }

  removeIngredient(index: number) {
    // For Dynamic display of ingredients
    // this.ingArr.removeAt(index);

    //For Static display of ingredients
    this.ingList.splice(index, 1);
  }

  back() {
    this.router.navigate(['/'])
  }

  addRecipe() {
    const newRecipe = this.recipeForm.value as Recipe;
    newRecipe.ingredients = this.ingList;
    newRecipe.id = "";
    this.rSvc.addRecipe(newRecipe)
      .then(v => console.info(v));
    this.recipeForm.reset();
    this.ingList = [];
    this.back();
  }

}
