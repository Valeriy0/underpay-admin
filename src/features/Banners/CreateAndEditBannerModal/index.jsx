import React, { useEffect, useState } from "react";
import { Input } from "../../../components/Input";
import { InputFile } from "../../../components/InputFile";
import { Toggle } from "../../../components/Toggle";
import { BannersRepository } from "../../../connectors/repositories/banners";

export const CreateAndEditBannerModal = ({ updateBannerList, id, bannerImageUrl, isActive, url }) => {
    const [bannerFile, setBannerFile] = useState(null);
    const [urlOnForm, setUrlOnForm] = useState('');
    const [isActiveOnForm, setIsActiveOnForm] = useState(false);

    useEffect(() => {
        if (id) {
            setBannerFile();
            setIsActiveOnForm(isActive);
            setUrlOnForm(url);
        }
    }, [id])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const bannerData = {
            bannerFile: bannerFile,
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
    
           return setBannerFile(file);
        }
      };

    return (
        <>
            
            <dialog id="createAndEditBanner_modal" class="modal">
                <div class="modal-box">
                    <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <span className="inline-block text-2xl text-white mb-5">{id ? 'Изменить' : 'Создать'} баннер #{id}</span>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                            <InputFile title="file" value={bannerFile} onChange={onFileChange} />
                            <Input  placeholder="Вставьте ссылку" title="Ссылка на баннере" value={urlOnForm} onChange={(e) => setUrlOnForm(e.target.value)} />
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