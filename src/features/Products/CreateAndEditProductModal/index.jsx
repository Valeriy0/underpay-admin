import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { ProductsRepository } from "../../../connectors/repositories/product";

export const CreateAndEditProductModal = ({ updateProductList, id, name, description, category, productImageUrl, backgroundImageUrl }) => {
  const [bgImage, setBgImage] = useState(null);   
  const [image, setImage] = useState(null);
  const [nameForm, setNameForm] = useState('');
            const [descForm, setDescForm] = useState('');
            const [categoryIdForm, setCategoryIdForm] = useState(1);

            useEffect(() => {
              if (id) {
                setNameForm(name);
                setDescForm(description);
                setCategoryIdForm(category?.id);
              }
            })
            
            const handleSubmit = (e) => {
                e.preventDefault();
                const data = {
                    backgroundImage: bgImage,
                    productImage: image,
                    name: nameForm,
                    description: descForm,
                    categoryId: Number(categoryIdForm),
                    itemIds: [1, 2, 3, 4]
                };
                
                if (id) {
                  editProduct(data);
                } else {
                  createProduct(data);
                }
                
              };
        
              const createProduct = async (data) => {
                await ProductsRepository.createProduct(data)
                  .then(() => {
                    updateProductList();
                  })
                  .catch((e) => console.log(e));
              };

              const editProduct = async (data) => {
                await ProductsRepository.editProduct(id, data)
                  .then(() => {
                    updateProductList();
                  })
                  .catch((e) => console.log(e));
              };
        
              const onFileChange = (e) => {
                e.preventDefault();
                if (e.target.files[0]) {
                  const [file] = e.target.files;
                  const reg = /(.*?)\.(jpg|jpeg|png|svg|webp)$/;
        
            
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
        <>
            
            <dialog id="createAndEditProduct_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <span className="inline-block text-2xl text-white mb-5">{id ? 'Изменить' : 'Создать'} продукт #{id}</span>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <InputFile title="Задний фон" value={image} onChange={onFileChange} />
                                      <InputFile title="Иконка продукта" value={image} onChange={onFileChange} />
                                            <Input title="Название" value={nameForm} onChange={(e) => setNameForm(e.target.value)} />
                                            <fieldset className="fieldset">
                                              <legend className="fieldset-legend text-[0.875rem] py-[0.5rem] px-[0.25rem]">Описание</legend>
                                              <textarea value={descForm} onChange={(e) => setDescForm(e.target.value)} className="textarea h-40 w-full input-bordered" placeholder="Заполните описание продукта"></textarea>
                                            </fieldset>
                                            <Input title="Выберите категорию" value={categoryIdForm} onChange={(e) => setCategoryIdForm(e.target.value)} />
                                            <div className="form-control mt-6">
                                            <button type="submit" className="btn btn-success">
                                              {id ? 'Изменить' : 'Создать'} продукт
                                            </button>
                                            </div>
                                       </form>

                    
                    
                </div>
            </dialog>
        </>
    )
}