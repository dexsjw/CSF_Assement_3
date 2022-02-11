import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeService } from './service/recipe.service';

const appRoutes: Routes = [
  { path: '', component: RecipeListComponent},
  { path: 'recipe/:recipeId', component: RecipeDetailComponent},
  { path: 'add', component: RecipeAddComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
