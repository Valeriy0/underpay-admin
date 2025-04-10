import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { useRequest } from "../../helpers/hooks/useRequest";
import { CategoriesRepository } from "../../connectors/repositories/categories";
import { CreateAndEditCategoryModal } from "../../features/Categories/CreateAndEditCategoryModal";


export const CategoriesPage = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { data, call, isLoading } = useRequest(CategoriesRepository.getCategories);
    const { data: dataDelete, call: callDelete, isLoading: isLoadingDelete } = useRequest(CategoriesRepository.deleteCategory);

    useEffect(() => {
      call();
    }, [])

    useEffect(() => {
        if (dataDelete?.success) {
            call();
        }
    }, [dataDelete])

    const openCreateBannerModal = () => {
        document.getElementById('createAndEditCategory_modal').showModal();
      }
  
    const openEditBannerModal = (bannerInfo) => {
        setDataForEdit(bannerInfo);
        document.getElementById('createAndEditCategory_modal').showModal();
    }

    return (
        <BaseLayout>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Категории</h1>
                    <button 
                        onClick={() => openCreateBannerModal()} 
                        className="btn btn-success btn-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Добавить категорию
                    </button>
                </div>
                
                {/* Десктопная версия таблицы */}
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="max-w-[2rem]">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        ID
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Название
                                    </div>
                                </th>
                                <th className="max-w-[3rem]">
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        На главной ?
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((item, itemIndex) => (
                                <tr key={itemIndex} className="hover">
                                    <td className="max-w-[2rem]">
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono">{item?.id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {item?.imageUrl ? (
                                                <div className="avatar">
                                                    <div className="w-8 h-8 rounded">
                                                        <img src={item?.imageUrl} alt={item?.name} />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="avatar placeholder">
                                                    <div className="bg-primary text-primary-content rounded-full w-8">
                                                        <span className="text-xs">{item?.name?.charAt(0)}</span>
                                                    </div>
                                                </div>
                                            )}
                                            <span>{item?.name}</span>
                                        </div>
                                    </td>
                                    <td className="max-w-[3rem]">
                                        {item?.isMain ? (
                                            <span className="badge badge-success gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Да
                                            </span>
                                        ) : (
                                            <span className="badge badge-error gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Нет
                                            </span>
                                        )}
                                    </td>
                                    <td className="max-w-[4rem]">
                                        <button 
                                            onClick={() => openEditBannerModal(item)} 
                                            className="btn btn-info btn-sm lg:btn-md gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Изменить
                                        </button>
                                    </td>
                                    <td className="max-w-[2rem]">
                                        <button 
                                            onClick={() => callDelete([item?.id])} 
                                            className="btn btn-error btn-sm lg:btn-md gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Удалить
                                        </button>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <CreateAndEditCategoryModal updateCategoryList={() => call()} {...dataForEdit} />
        </BaseLayout>
    )
}