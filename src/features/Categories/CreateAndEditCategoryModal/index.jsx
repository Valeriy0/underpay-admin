import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { Toggle } from "../../../components/Toggle";
import { CategoriesRepository } from "../../../connectors/repositories/categories";

export const CreateAndEditCategoryModal = ({ updateCategoryList, id, name, isMain, icon }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isOnMainPage, setIsOnMainPage] = useState(false);
    const [iconForm, setIconForm] = useState(false);

    useEffect(() => {
        if (id) {
          setCategoryName(name);
          setIsOnMainPage(isMain);
          setIconForm(icon);
        }
    }, [id])
    
        
        const handleSubmit = (e) => {
            e.preventDefault();
            const data = {
                icon: iconForm,
                name: categoryName,
                isMain: isOnMainPage,
            };
            
            if (id) {
              updateCategory(data);
            } else {
              createCategory(data);
            }
            
          };
    
          const createCategory = async (data) => {
            await CategoriesRepository.createCategory(data)
              .then(() => {
                updateCategoryList();
              })
              .catch((e) => console.log(e));
          };

          const updateCategory = async (data) => {
            await CategoriesRepository.editCategory(id, data)
              .then(() => {
                updateCategoryList();
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
        
               return setIconForm(file);
            }
          };
          

    return (
        <>
            
            <dialog id="createAndEditCategory_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <span className="inline-block text-2xl text-white mb-5">{id ? 'Изменить' : 'Создать'} баннер #{id}</span>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                         <InputFile title="Иконка категории" value={iconForm} onChange={onFileChange} />
                    
                                            <Input title="Название категории" placeholder="Введите название" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                                            <Toggle title={'Показывать на главной ?'} isToggled={isOnMainPage} handleToggle={() => setIsOnMainPage((prev) => !prev)} />
                                            <div className="form-control mt-6">
                                            <button type="submit" className="btn btn-primary">
                                                {id ? 'Изменить' : 'Создать'} категорию
                                            </button>
                                            </div>
                                       </form>

                    
                    
                </div>
            </dialog>
        </>
    )
}