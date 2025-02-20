import React, { useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { Input } from "../../components/Input";
import { InputFile } from "../../components/InputFile";
import { Toggle } from "../../components/Toggle";
import { BannersRepository } from "../../connectors/repositories/banners";


export const Banners = () => {
    const [bannerFile, setBannerFile] = useState(null);
    const [url, setUrl] = useState();
    const [isActive, setIsActive] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const bannerData = {
            bannerFile: bannerFile,
            url: url,
            isActive: isActive,
        };
        console.log("Product Data:", bannerData);
      
        uploadBanner(bannerData)
      };

      const uploadBanner = async (bannerData) => {
        await BannersRepository.createBanner(bannerData)
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
    
           return setBannerFile(file);
        }
      };

    return (
        <BaseLayout className="pt-[3.2rem] pb-[4.8rem] px-[0.8rem] space-y-[1.6rem] overflow-y-auto invisible-scrollbar">
           Create banner
           <form onSubmit={handleSubmit} className="space-y-4">
                <InputFile title="file" value={bannerFile} onChange={onFileChange} />
                <Input title="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Toggle isToggled={isActive} handleToggle={() => setIsActive((prev) => !prev)} />
                <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                    Создать баннер
                </button>
                </div>
           </form>
        </BaseLayout>
    )
}