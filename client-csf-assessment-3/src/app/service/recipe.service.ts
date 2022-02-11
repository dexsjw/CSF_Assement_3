import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeSummary } from '../recipe-model';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Promise<RecipeSummary[]> {
    return lastValueFrom(
      this.http.get<RecipeSummary[]>("/api/recipes")
    );
  }

}
