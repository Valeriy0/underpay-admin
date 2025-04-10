import React, { useState } from "react";
import { InputFile } from "../../../components/InputFile";
import { ItemsRepository } from "../../../connectors/repositories/items";

export const EditItemModal = ({ updateItemList, id, imageUrl, onClose }) => {
  const [image, setImage] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {};
    
    if (image !== null) {
      data.image = image;
    }

    editItem(data);
  };

  const editItem = async (data) => {
    await ItemsRepository.editItem(id, data)
      .then(() => {
        updateItemList();
        onClose?.();
      })
      .catch((e) => console.log(e));
  };

  const onFileChange = (e) => {
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
            
      setImage(file);
      setCurrentImageUrl(URL.createObjectURL(file));
      setShowFileInput(false);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setShowFileInput(false);
    setCurrentImageUrl(null);
  };

  return (
    <>
      <dialog id="editItem_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                setImage(null);
                setShowFileInput(false);
                setCurrentImageUrl(imageUrl);
                onClose?.();
              }}
            >✕</button>
          </form>
          <span className="inline-block text-2xl text-white mb-5">Изменить изображение #{id}</span>
                    
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="label">
                <span className="label-text font-medium text-sm lg:text-base">Изображение</span>
              </div>
              {currentImageUrl && !showFileInput && (
                <div className="flex flex-col items-start gap-2">
                  <div className="relative group w-[150px] h-[150px]">
                    <img 
                      src={currentImageUrl} 
                      alt="Item preview" 
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

            <div className="flex justify-end gap-2">
              <button 
                type="button" 
                className="btn btn-ghost"
                onClick={() => {
                  setImage(null);
                  setShowFileInput(false);
                  setCurrentImageUrl(imageUrl);
                  onClose?.();
                }}
              >
                Отмена
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!image}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}; 