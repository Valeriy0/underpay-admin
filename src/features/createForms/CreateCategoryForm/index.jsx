import React, { useState } from "react";
import { Input } from "../../../components/Input";
import { CategoriesRepository } from "../../../connectors/repositories/categories";

export const CreateCategoryForm = () => {
        const [categoryName, setCategoryName] = useState();
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                name: categoryName,
            };
            console.log("Product Data:", data);
          
            createCategory(data)
          };
    
          const createCategory = async (data) => {
            await CategoriesRepository.createCategory(data)
              .then(() => {
                console.log('success')
              })
              .catch((e) => console.log(e));
          };
    

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
                        <Input title="url" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Создать категорию
                        </button>
                        </div>
                   </form>
    )
}