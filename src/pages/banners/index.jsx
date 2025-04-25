import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { BannersRepository } from "../../connectors/repositories/banners";
import { useRequest } from "../../helpers/hooks/useRequest";
import { CreateAndEditBannerModal } from "../../features/Banners/CreateAndEditBannerModal/index.jsx";


export const Banners = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { data, call, isLoading } = useRequest(BannersRepository.getBanners);
    const { data: dataDelete, call: callDelete, isLoading: isLoadingDelete } = useRequest(BannersRepository.deleteBanner);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' или 'list'

    useEffect(() => {
      call();
    }, [])

    useEffect(() => {
      if (dataDelete?.success) {
        call();
      }
    }, [dataDelete]);

    const handleCloseModal = () => {
        setDataForEdit(null);
        document.getElementById('createAndEditBanner_modal').close();
    };

    const openCreateBannerModal = () => {
        setDataForEdit(null);
        document.getElementById('createAndEditBanner_modal').showModal();
    }

    const openEditBannerModal = (bannerInfo) => {
        setDataForEdit(bannerInfo);
        document.getElementById('createAndEditBanner_modal').showModal();
    }
    
    return (
        <BaseLayout>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row items-center justify-between gap-4">
              <h1 className="text-3xl font-bold">Баннеры</h1>
              
              <div className="flex items-center gap-2">
                <div className="join">
                  <button 
                    className={`join-item btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    className={`join-item btn ${viewMode === 'list' ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                
                <button 
                  onClick={() => openCreateBannerModal()} 
                  className="btn btn-primary btn-md"
                >
                  Добавить баннер
                </button>
              </div>
            </div>
            
            {/* Режим сетки */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.data?.banners.map((item, itemIndex) => (
                  <div 
                    className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300" 
                    key={itemIndex}
                  >
                    <figure className="px-4 pt-4">
                      <div className="relative w-full h-48 overflow-hidden rounded-xl">
                        <img 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                          src={item?.imageUrl} 
                          alt={`Баннер #${item?.id}`} 
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`badge ${item?.isActive ? 'badge-success' : 'badge-error'}`}>
                            {item?.isActive ? 'Активен' : 'Неактивен'}
                          </span>
                        </div>
                      </div>
                    </figure>
                    <div className="card-body p-4">
                      <h2 className="card-title text-base lg:text-lg">Баннер #{item?.id}</h2>
                      <div className="card-actions justify-end mt-4">
                        <button 
                          onClick={() => openEditBannerModal(item)} 
                          className="btn btn-info btn-sm lg:btn-md"
                        >
                          Изменить
                        </button>
                        <button 
                          onClick={() => callDelete([item?.id])} 
                          className="btn btn-error btn-sm lg:btn-md"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Режим списка */}
            {viewMode === 'list' && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Изображение</th>
                      <th>Статус</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.banners.map((item, itemIndex) => (
                      <tr key={itemIndex} className="hover">
                        <td className="font-medium">#{item?.id}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded">
                                <img src={item?.bannerImageUrl} alt={`Баннер #${item?.id}`} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${item?.isActive ? 'badge-success' : 'badge-error'}`}>
                            {item?.isActive ? 'Активен' : 'Неактивен'}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditBannerModal(item)} 
                              className="btn btn-info btn-xs lg:btn-sm"
                            >
                              Изменить
                            </button>
                            <button 
                              onClick={() => callDelete([item?.id])} 
                              className="btn btn-error btn-xs lg:btn-sm"
                            >
                              Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Сообщение, если нет баннеров */}
            {data?.data?.banners?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Нет баннеров</h3>
                <p className="mt-2 text-base-content/70">Добавьте свой первый баннер, нажав на кнопку выше</p>
                <button 
                  onClick={() => openCreateBannerModal()} 
                  className="btn btn-primary mt-4"
                >
                  Добавить баннер
                </button>
              </div>
            )}
          </div>
           
          <CreateAndEditBannerModal 
            updateBannerList={() => call()} 
            onClose={handleCloseModal}
            {...dataForEdit} 
          />
        </BaseLayout>
    )
}