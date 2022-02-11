package ibf2021.assessment.csf.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

/* Write your request hander in this file */

@RestController
@RequestMapping(path="/api")
public class RecipesRestController {
    
    @Autowired
    private RecipeService rSvc;

    @GetMapping(path="/recipes", produces="application/json")
    public ResponseEntity<String> getRecipes(){
        List<Recipe> recipes = this.rSvc.getAllRecipes();
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Recipe recipe: recipes) {
            arrBuilder.add(Json.createObjectBuilder()
                .add("id", recipe.getId())
                .add("title", recipe.getTitle())
            );
        }
        final JsonArray arrResp = arrBuilder.build();
        return ResponseEntity.ok(arrResp.toString());
    }
}