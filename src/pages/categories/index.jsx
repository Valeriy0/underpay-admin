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
        <BaseLayout className="space-y-[1.6rem] overflow-y-auto invisible-scrollbar">
            <div className="flex flex-col justify-start space-y-10 w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 class="text-3xl font-bold">Категории</h1>
                    <button onClick={() => openCreateBannerModal()} class="btn btn-success">Создать категорию</button>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th className="max-w-[2rem]">ID</th>
                            <th>Название</th>
                            <th className="max-w-[3rem]">На главной ?</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((item, itemIndex) => {
                                return (
                                    <tr key={itemIndex}>
                                        <td className="max-w-[2rem]">{item?.id}</td>
                                        <td>{item?.name}</td>
                                        <td className="max-w-[3rem]">{item?.isMain ? 'Да' : 'Нет'}</td>
                                        <td className="max-w-[4rem]">
                                            <button onClick={() => openEditBannerModal(item)} class="w-full btn btn-soft btn-info flex-1">Изменить</button>
                                        </td>
                                        <td className="max-w-[2rem]">
                                            <button onClick={() => callDelete([item?.id])} class="w-full btn btn-soft btn-error">Удалить</button>
                                        </td>
                                    </tr> 
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <CreateAndEditCategoryModal updateCategoryList={() => call()} {...dataForEdit} />
        </BaseLayout>
    )
}