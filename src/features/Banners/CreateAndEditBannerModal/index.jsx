import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { Toggle } from "../../../components/Toggle";
import { BannersRepository } from "../../../connectors/repositories/banners";

export const CreateAndEditBannerModal = ({ updateBannerList, id, bannerImageUrl, isActive, url, onClose }) => {
    const [bannerFile, setBannerFile] = useState(null);
    const [urlOnForm, setUrlOnForm] = useState('');
    const [isActiveOnForm, setIsActiveOnForm] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [currentBannerImageUrl, setCurrentBannerImageUrl] = useState(bannerImageUrl);

    useEffect(() => {
        if (id) {
            setBannerFile(null);
            setIsActiveOnForm(isActive);
            setUrlOnForm(url);
            setShowFileInput(false);
            setCurrentBannerImageUrl(bannerImageUrl);
        } else {
            setBannerFile(null);
            setUrlOnForm('');
            setIsActiveOnForm(false);
            setShowFileInput(false);
            setCurrentBannerImageUrl(null);
        }
    }, [id, isActive, url, bannerImageUrl]);

    const resetForm = () => {
        setBannerFile(null);
        setUrlOnForm('');
        setIsActiveOnForm(false);
        setShowFileInput(false);
        setCurrentBannerImageUrl(null);
        onClose?.();
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const bannerData = {
            image: bannerFile,
            url: urlOnForm,
            isActive: isActiveOnForm,
        };
      
        if (id) {
            updateBanner(bannerData);
        } else {
            createBanner(bannerData);
        }
    };

    const createBanner = async (bannerData) => {
        await BannersRepository.createBanner(bannerData)
            .then(() => {
                updateBannerList();
            })
            .catch((e) => console.log(e));
    };

    const updateBanner = async (bannerData) => {
        await BannersRepository.editBanner(id, bannerData)
            .then(() => {
                updateBannerList();
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
    
            setBannerFile(file);
            setCurrentBannerImageUrl(URL.createObjectURL(file));
            setShowFileInput(false);
        }
    };

    const handleDeleteImage = () => {
        setBannerFile(null);
        setShowFileInput(false);
        setCurrentBannerImageUrl(null);
    };

    return (
        <>
            <dialog id="createAndEditBanner_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                        <button 
                            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={resetForm}
                        >✕</button>
                    </form>
                    <span className="inline-block text-2xl text-white mb-5">{id ? 'Изменить' : 'Создать'} баннер #{id}</span>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="label">
                                <span className="label-text font-medium text-sm lg:text-base">Изображение баннера</span>
                            </div>
                            {currentBannerImageUrl && !showFileInput && (
                                <div className="flex flex-col items-start gap-2">
                                    <div className="relative group w-[200px] h-[200px]">
                                        <img 
                                            src={currentBannerImageUrl} 
                                            alt="Banner preview" 
                                            className="w-full h-full object-contain rounded-lg shadow-lg"
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
                            {(!currentBannerImageUrl || showFileInput) && (
                                <div className="card bg-base-200 w-[200px] h-[200px]">
                                    <div className="card-body p-4 h-full flex items-center justify-center">
                                        <InputFile 
                                            title="file" 
                                            onChange={onFileChange} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <Input placeholder="Вставьте ссылку" title="Ссылка на баннере" value={urlOnForm} onChange={(e) => setUrlOnForm(e.target.value)} />
                        <Toggle title={'Показывать баннер ?'} isToggled={isActiveOnForm} handleToggle={() => setIsActiveOnForm((prev) => !prev)} />
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-success">
                                {id ? 'Изменить баннер' : 'Создать баннер'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}