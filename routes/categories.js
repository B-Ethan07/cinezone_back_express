import { Router } from "express";
import { category, moviesByCategory } from "../Controller/CategoriesController.js";
import { requireAdminQuery } from "../middleware/requireAdminQuery.js";

const router = Router();
    // GET
    router.get("/", category);
    router.get("/:id/movies", moviesByCategory);
    
    // POST
    router.post("/", category); 
    
    // PUT
    router.put("/:id", category); 
    
    // DELETE
    router.delete("/:id", requireAdminQuery, category); // Assuming admin access is required for deleting categories


export { router as categoriesRouter };