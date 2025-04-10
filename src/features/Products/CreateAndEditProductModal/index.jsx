import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { CustomSelect } from "../../../components/CustomSelect";
import { ProductsRepository } from "../../../connectors/repositories/product";
import { CategoriesRepository } from "../../../connectors/repositories/categories";
import { useRequest } from "../../../helpers/hooks/useRequest";

export const CreateAndEditProductModal = ({ updateProductList, id, name, description, category, productImageUrl, backgroundImageUrl, items, mooGoldItems, onClose }) => {
  const [bgImage, setBgImage] = useState(null);   
  const [image, setImage] = useState(null);
  const [nameForm, setNameForm] = useState('');
  const [descForm, setDescForm] = useState('');
  const [categoryIdForm, setCategoryIdForm] = useState('');
  const [showBgFileInput, setShowBgFileInput] = useState(false);
  const [showProductFileInput, setShowProductFileInput] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentBgImageUrl, setCurrentBgImageUrl] = useState(backgroundImageUrl);
  const [currentProductImageUrl, setCurrentProductImageUrl] = useState(productImageUrl);
  
  // Получаем список категорий из API
  const { data: categoriesData, call: getCategories } = useRequest(CategoriesRepository.getCategories);
  
  useEffect(() => {
    // Загружаем категории при монтировании компонента
    getCategories();
  }, []);
  
  useEffect(() => {
    if (id) {
      setNameForm(name);
      setDescForm(description);
      setCategoryIdForm(category?.id || '');
      setBgImage(null);
      setImage(null);
      setShowBgFileInput(false);
      setShowProductFileInput(false);
      setCurrentBgImageUrl(backgroundImageUrl);
      setCurrentProductImageUrl(productImageUrl);
      setSelectedItems(mooGoldItems?.map(item => item.id) || []);
    } else {
      // Сброс состояний при создании нового продукта
      setNameForm('');
      setDescForm('');
      setCategoryIdForm('');
      setBgImage(null);
      setImage(null);
      setShowBgFileInput(false);
      setShowProductFileInput(false);
      setCurrentBgImageUrl(null);
      setCurrentProductImageUrl(null);
      setSelectedItems([]);
    }
  }, [id, name, description, category, backgroundImageUrl, productImageUrl, mooGoldItems]);
            
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {};
    
    // Добавляем только измененные поля
    if (bgImage !== null) {
      data.backgroundImage = bgImage;
    }
    if (image !== null) {
      data.productImage = image;
    }
    if (nameForm && (id ? nameForm !== name : true)) {
      data.name = nameForm;
    }
    if (descForm && (id ? descForm !== description : true)) {
      data.description = descForm;
    }
    if (categoryIdForm && (id ? Number(categoryIdForm) !== category?.id : true)) {
      data.categoryId = Number(categoryIdForm);
    }
    if (selectedItems.length > 0) {
      data.itemIds = selectedItems;
    }

    console.log('Отправляемые данные:', data);
                
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
        
  const onFileChange = (e, type) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const [file] = e.target.files;
      const reg = /(.*?)\.(jpg|jpeg|png|svg|webp)$/;
            
      if (!file?.name?.match(reg)) {
        return console.log('Error: unsupported file format');
      }
            
      if (2000000 && file.size && file.size > 2000000) {
        return console.log('bag size');
      }
            
      if (type === 'background') {
        setBgImage(file);
        setCurrentBgImageUrl(URL.createObjectURL(file));
        setShowBgFileInput(false);
      } else if (type === 'product') {
        setImage(file);
        setCurrentProductImageUrl(URL.createObjectURL(file));
        setShowProductFileInput(false);
      }
    }
  }; 

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleDeleteImage = (type) => {
    if (type === 'background') {
      setBgImage(null);
      setShowBgFileInput(false);
      setCurrentBgImageUrl(null);
    } else if (type === 'product') {
      setImage(null);
      setShowProductFileInput(false);
      setCurrentProductImageUrl(null);
    }
  };

  return (
    <>
      <dialog id="createAndEditProduct_modal" className="modal">
        <div className="modal-box max-w-6xl">
          <form method="dialog">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setNameForm('');
                setDescForm('');
                setCategoryIdForm('');
                setBgImage(null);
                setImage(null);
                setShowBgFileInput(false);
                setShowProductFileInput(false);
                setCurrentBgImageUrl(null);
                setCurrentProductImageUrl(null);
                setSelectedItems([]);
                onClose?.();
              }}
            >✕</button>
          </form>
          <span className="inline-block text-2xl text-white mb-5">{id ? 'Изменить' : 'Создать'} продукт #{id}</span>
                    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="label">
                      <span className="label-text font-medium text-sm lg:text-base">Задний фон</span>
                    </div>
                    {currentBgImageUrl && !showBgFileInput && (
                      <div className="flex flex-col items-start gap-2">
                        <div className="relative group w-[150px] h-[150px]">
                          <img 
                            src={currentBgImageUrl} 
                            alt="Background preview" 
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button 
                              type="button" 
                              className="btn btn-sm btn-primary"
                              onClick={() => setShowBgFileInput(true)}
                            >
                              Заменить
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-error"
                              onClick={() => handleDeleteImage('background')}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {(!currentBgImageUrl || showBgFileInput) && (
                      <div className="card bg-base-200 w-[150px] h-[150px]">
                        <div className="card-body p-4 h-full flex items-center justify-center">
                          <InputFile 
                            title="file" 
                            onChange={(e) => onFileChange(e, 'background')} 
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="label">
                      <span className="label-text font-medium text-sm lg:text-base">Иконка продукта</span>
                    </div>
                    {currentProductImageUrl && !showProductFileInput && (
                      <div className="flex flex-col items-start gap-2">
                        <div className="relative group w-[150px] h-[150px]">
                          <img 
                            src={currentProductImageUrl} 
                            alt="Product icon preview" 
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                            <button 
                              type="button" 
                              className="btn btn-sm btn-primary"
                              onClick={() => setShowProductFileInput(true)}
                            >
                              Заменить
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-sm btn-error"
                              onClick={() => handleDeleteImage('product')}
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {(!currentProductImageUrl || showProductFileInput) && (
                      <div className="card bg-base-200 w-[150px] h-[150px]">
                        <div className="card-body p-4 h-full flex items-center justify-center">
                          <InputFile 
                            title="file" 
                            onChange={(e) => onFileChange(e, 'product')} 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <CustomSelect 
                  title="Выберите категорию" 
                  value={categoryIdForm} 
                  onChange={(value) => setCategoryIdForm(value)} 
                  options={categoriesData?.data || []}
                  placeholder="Выберите категорию"
                />

                <Input 
                  title="Название" 
                  value={nameForm} 
                  onChange={(e) => setNameForm(e.target.value)} 
                />
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[0.875rem] py-[0.5rem] px-[0.25rem]">Описание</legend>
                  <textarea 
                    value={descForm} 
                    onChange={(e) => setDescForm(e.target.value)} 
                    className="textarea h-40 w-full input-bordered" 
                    placeholder="Заполните описание продукта"
                  />
                </fieldset>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="label">
                    <span className="label-text font-medium text-sm lg:text-base">Добавляемые айтемы</span>
                  </div>
                  <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Название</th>
                          <th>Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <input
                                type="checkbox"
                                className="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleItemSelect(item.id)}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-success">
                {id ? 'Изменить' : 'Создать'} продукт
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};