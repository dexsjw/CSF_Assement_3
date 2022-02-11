import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Recipe } from '../recipe-model';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {

  recipeForm!: FormGroup;
  ingForm!: FormGroup;
  recipe!: Recipe
  ingredients!: string[]

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createRecipeForm();
  }

  createRecipeForm() {
    this.recipeForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      image: this.fb.control('', [Validators.required]),
      ingredients: this.fb.array([new FormControl('', [Validators.required])]),
      instruction: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(this.fb.control(''));
  }

  back() {
    this.router.navigate(['/'])
  }

  addRecipe() {
    console.info(this.recipeForm.value)
    this.back();
  }

}
