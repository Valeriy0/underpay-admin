import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { BannersRepository } from "../../connectors/repositories/banners";
import { useRequest } from "../../helpers/hooks/useRequest";
import { CreateAndEditBannerModal } from "../../features/Banners/CreateAndEditBannerModal/index.jsx";


export const Banners = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { data, call, isLoading } = useRequest(BannersRepository.getBanners);

    const { data: dataDelete, call: callDelete, isLoading: isLoadingDelete } = useRequest(BannersRepository.deleteBanner);

    useEffect(() => {
      call();
    }, [])

    useEffect(() => {
      if (dataDelete?.success) {
        call();
      }
    }, [dataDelete]);


    const openCreateBannerModal = () => {
      document.getElementById('createAndEditBanner_modal').showModal();
    }

    const openEditBannerModal = (bannerInfo) => {
      setDataForEdit(bannerInfo);
      document.getElementById('createAndEditBanner_modal').showModal();
    }
    
    return (
        <BaseLayout className="space-y-[1.6rem] overflow-y-auto invisible-scrollbar">
          <div className="flex flex-col justify-start space-y-10 w-full">
          <h1 class="text-3xl font-bold">Баннеры</h1>
            <div className="grid grid-cols-5 w-full gap-5">
              {data?.data?.banners.map((item, itemIndex) => {
                return (
                  <div className="relative p-[1rem] rounded-[1rem] bg-white-100 w-[16rem] h-[26rem] flex flex-col items-center justify-start space-y-2" key={itemIndex}>
                    <div className="flex flex-col flex-1 space-y-2 w-full">
                      <img className="bg-white-100 rounded-[0.8rem] w-full h-[15rem] max-w-full" src={item?.bannerImageUrl} alt="" />
                      <div className="!mt-4 flex items-center justify-start">
                        <span>Баннер #{item?.id}</span>
                      </div>
                      <div className="flex items-center justify-start w-full space-x-2">
                        <span>Показывается:</span><span>{item?.isActive ? 'Да': 'Нет'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full space-x-2">
                      <button onClick={() => openEditBannerModal(item)} class="btn btn-soft btn-info flex-1">Изменить</button>
                      <button onClick={() => callDelete([item?.id])} class="btn btn-soft btn-error">Удалить</button>
                    </div>
                  </div>
                )
              })}
              <button onClick={() => openCreateBannerModal()} className="rounded-[1rem] bg-white-100 w-[16rem] h-[26rem] flex items-center justify-center">
                <span className="text-5xl text-white">+</span>
              </button>
            </div>
          </div>
           
           <CreateAndEditBannerModal updateBannerList={() => call()} {...dataForEdit} />
        </BaseLayout>
    )
}