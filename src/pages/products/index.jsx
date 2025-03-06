import react, { useState, useEffect } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { useRequest } from "../../helpers/hooks/useRequest";
import { ProductsRepository } from "../../connectors/repositories/product";
import { CreateAndEditProductModal } from "../../features/Products/CreateAndEditProductModal";

export const ProductsPage = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { call, data } = useRequest(ProductsRepository.getProducts);

    useEffect(() => {
        call();
    }, [])

    const openCreateProductModal = () => {
        document.getElementById('createAndEditProduct_modal').showModal();
      }
  
      const openEditProductModal = (productInfo) => {
        setDataForEdit(productInfo);
        document.getElementById('createAndEditProduct_modal').showModal();
      }

    return (
        <BaseLayout>
    
            <div className="flex flex-col justify-start space-y-10 w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 class="text-3xl font-bold">Продукты</h1>
                    <button class="btn btn-success">Добавить категорию</button>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th className="max-w-[2rem]">ID</th>
                            <th>Название</th>
                            <th >Описание</th>
                            <th>Категория</th>
                            <th>В популярном ?</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((item, itemIndex) => {
                                return (
                                    <tr key={itemIndex}>
                                        <td >{item?.id}</td>
                                        <td>{item?.name}</td>
                                        <td >{item?.description}</td>
                                        <td >{item?.category?.name}</td>
                                        <td > - в популярном ли - </td>
                                        <td >
                                            <button onClick={() => openEditProductModal(item)} class="w-full btn btn-soft btn-info flex-1">Изменить</button>
                                        </td>
                                    </tr> 
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <CreateAndEditProductModal updateProductList={() => call()} {...dataForEdit} />
            </div>
        </BaseLayout>
    )
}