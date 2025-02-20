import React, { useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { ProductsRepository } from "../../../connectors/repositories/product";

export const CreateProductForm = () => {
        const [image, setImage] = useState(null);
        const [name, setName] = useState('');
        const [desc, setDesc] = useState('');
        const [categoryId, setCategoryId] = useState(1);
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                backgroundImage: image,
                productImage: image,
                name: name,
                description: desc,
                categoryId: Number(categoryId),
                itemIds: [1, 2, 3, 4]
            };
          
            createCategory(data)
          };
    
          const createCategory = async (data) => {
            await ProductsRepository.createProduct(data)
              .then(() => {
                console.log('success')
              })
              .catch((e) => console.log(e));
          };
    
          const onFileChange = (e) => {
            e.preventDefault();
            if (e.target.files[0]) {
              const [file] = e.target.files;
              const reg = /(.*?)\.(jpg|jpeg|png)$/;
    
        
              if (!file?.name?.match(reg)) {
                return console.log('Error: unsupported file format');
              }
    
              if (2000000 && file.size && file.size > 2000000) {
                return console.log('bag size');
              }
        
               return setImage(file);
            }
          };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
                  <InputFile title="file" value={image} onChange={onFileChange} />
                        <Input title="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Input title="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <Input title="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                        <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">
                            Создать продукт
                        </button>
                        </div>
                   </form>
    )
}