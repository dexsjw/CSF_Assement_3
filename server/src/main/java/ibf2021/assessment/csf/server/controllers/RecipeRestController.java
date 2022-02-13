package ibf2021.assessment.csf.server.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

/* Write your request hander in this file */

@RestController
@RequestMapping(path="/api/recipe")
public class RecipeRestController {
    
    @Autowired
    private RecipeService rSvc;

    @CrossOrigin
    @GetMapping(path="/{recipeId}", produces="application/json")
    public ResponseEntity<String> getRecipeById(@PathVariable String recipeId) {
        Optional<Recipe> optRecipe = this.rSvc.getRecipeById(recipeId);
        if (optRecipe.isPresent()) {
            Recipe recipe = optRecipe.get();
            JsonObject objResp = Json.createObjectBuilder()
                .add("id", recipe.getId())
                .add("title", recipe.getTitle())
                .add("image", recipe.getImage())
                .add("instruction", recipe.getInstruction())
                .add("ingredients", Json.createArrayBuilder(recipe.getIngredients()))
                .build();
            return ResponseEntity.status(HttpStatus.OK).body(objResp.toString());
        } else {
            JsonObject errorMsg = Json.createObjectBuilder()
                .add("error", "Recipe does not exist! Please create one!")
                .build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMsg.toString());
        }
    }

    @PostMapping(consumes="application/json", produces="application/json")
    public ResponseEntity<String> addRecipe(@RequestBody Recipe recipe) {
        Recipe newRecipe = new Recipe();
        newRecipe = recipe;
        System.out.println(newRecipe);
        JsonObject respMsg = Json.createObjectBuilder()
            .add("msg", newRecipe.toString())
            .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(respMsg.toString());
    }

}