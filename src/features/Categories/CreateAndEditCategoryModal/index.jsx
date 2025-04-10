import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { Toggle } from "../../../components/Toggle";
import { CategoriesRepository } from "../../../connectors/repositories/categories";

export const CreateAndEditCategoryModal = ({ updateCategoryList, id, name, isMain, imageUrl }) => {
    const [categoryId, setCategoryId] = useState(id);
    const [categoryName, setCategoryName] = useState('');
    const [isOnMainPage, setIsOnMainPage] = useState(false);
    const [iconForm, setIconForm] = useState(null);
    const [showFileInput, setShowFileInput] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

    const resetForm = () => {
        setCategoryId(null);
        setCategoryName('');
        setIsOnMainPage(false);
        setIconForm(null);
        setShowFileInput(false);
        setCurrentImageUrl(null);
    };

    useEffect(() => {
        if (id) {
          setCategoryId(id);
          setCategoryName(name);
          setIsOnMainPage(isMain);
          setIconForm(null);
          setShowFileInput(false);
          setCurrentImageUrl(imageUrl);
        } else {
          resetForm();
        }
    }, [id, name, isMain, imageUrl])
    
    const handleClose = () => {
        const modal = document.getElementById('createAndEditCategory_modal');
        if (modal) {
            modal.close();
            resetForm();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {};
        
        if (iconForm !== null) {
          data.imageUrl = iconForm;
        }
        
        if (categoryId) {
          if (name !== categoryName) {
            data.name = categoryName;
          }
          if (isMain !== isOnMainPage) {
            data.isMain = isOnMainPage;
          }
          updateCategory(data);
        } else {
          data.imageUrl = iconForm;
          data.name = categoryName;
          data.isMain = isOnMainPage;
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
      
          setIconForm(file);
          setCurrentImageUrl(URL.createObjectURL(file));
          setShowFileInput(false);
        }
    };

    const handleDeleteImage = () => {
        setIconForm(null);
        setShowFileInput(false);
        setCurrentImageUrl(null);
    };

    return (
        <>
            <dialog id="createAndEditCategory_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</button>
                    </form>
                    <span className="inline-block text-2xl text-white mb-5">{categoryId ? 'Изменить' : 'Создать'} категорию #{categoryId}</span>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="label">
                                <span className="label-text font-medium text-sm lg:text-base">Иконка категории</span>
                            </div>
                            {currentImageUrl && !showFileInput && (
                                <div className="flex flex-col items-start gap-2">
                                    <div className="relative group w-[150px] h-[150px]">
                                        <img 
                                            src={currentImageUrl} 
                                            alt="Category icon preview" 
                                            className="w-full h-full object-cover rounded-lg shadow-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-primary"
                                                onClick={() => setShowFileInput(true)}
                                            >
                                                Заменить
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-error"
                                                onClick={handleDeleteImage}
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(!currentImageUrl || showFileInput) && (
                                <div className="card bg-base-200 w-[150px] h-[150px]">
                                    <div className="card-body p-4 h-full flex items-center justify-center">
                                        <InputFile 
                                            title="file" 
                                            onChange={onFileChange} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <Input 
                            title="Название категории" 
                            placeholder="Введите название" 
                            value={categoryName} 
                            onChange={(e) => setCategoryName(e.target.value)} 
                        />
                        <Toggle 
                            title={'Показывать на главной ?'} 
                            isToggled={isOnMainPage} 
                            handleToggle={() => setIsOnMainPage((prev) => !prev)} 
                        />
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