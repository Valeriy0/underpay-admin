import react, { useState, useEffect } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { useRequest } from "../../helpers/hooks/useRequest";
import { ProductsRepository } from "../../connectors/repositories/product";
import { CreateAndEditProductModal } from "../../features/Products/CreateAndEditProductModal";
import { WithdrawalsRepository } from "../../connectors/repositories/withdrawals";
import { PopularProductsRepository } from "../../connectors/repositories/popular-products";

export const ProductsPage = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { call, data } = useRequest(ProductsRepository.getProducts);
    const { call: callDelete } = useRequest(ProductsRepository.deleteProduct);
    const { call: callAddToPopular } = useRequest(PopularProductsRepository.addProductToPopularProducts);
    const { call: callDeleteFromPopular } = useRequest(PopularProductsRepository.deleteProductFromPopularProducts);

    const { call: callItems, data: dataItems } = useRequest(WithdrawalsRepository.getItems);

    useEffect(() => {
        callItems([{ region: 'us' }])
    }, [])
    

    useEffect(() => {
        call();
    }, [])

    const openCreateProductModal = () => {
        setDataForEdit(null);
        document.getElementById('createAndEditProduct_modal').showModal();
    }
  
    const openEditProductModal = (productInfo) => {
        setDataForEdit(productInfo);
        document.getElementById('createAndEditProduct_modal').showModal();
    }

    const handleDelete = async (id) => {
        await callDelete([id]);
        call(); // Обновляем список продуктов после удаления
    }

    const handlePopularToggle = async (item) => {
        if (item?.isPopular) {
            await callDeleteFromPopular([item?.id]);
        } else {
            await callAddToPopular([item?.id]);
        }
        call(); // Обновляем список продуктов после изменения популярности
    }

    return (
        <BaseLayout>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Продукты</h1>
                    <button 
                        onClick={() => openCreateProductModal()} 
                        className="btn btn-success btn-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Добавить продукт
                    </button>
                </div>
                
                {/* Десктопная версия таблицы */}
                <div className="hidden md:block overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
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
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        Описание
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        Категория
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                        В популярном ?
                                    </div>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((item, itemIndex) => (
                                <tr key={itemIndex} className="hover">
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono">{item?.id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {item?.productImageUrl ? (
                                                <div className="avatar">
                                                    <div className="w-8 h-8 rounded">
                                                        <img src={item?.productImageUrl} alt={item?.name} />
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
                                    <td className="max-w-xs truncate">{item?.description}</td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="badge badge-outline">{item?.category?.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <label className="swap swap-flip">
                                            <input 
                                                type="checkbox" 
                                                checked={item?.isPopular} 
                                                onChange={() => handlePopularToggle(item)}
                                            />
                                            <div className="swap-on">
                                                <span className="badge badge-success gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Да
                                                </span>
                                            </div>
                                            <div className="swap-off">
                                                <span className="badge badge-ghost gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Нет
                                                </span>
                                            </div>
                                        </label>
                                    </td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => openEditProductModal(item)} 
                                                className="btn btn-info btn-sm lg:btn-md gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Изменить
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(item?.id)} 
                                                className="btn btn-error btn-sm lg:btn-md gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Мобильная версия карточек */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {data?.data?.map((item, itemIndex) => (
                        <div key={itemIndex} className="card bg-base-200 shadow-xl">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        {item?.productImageUrl ? (
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded">
                                                    <img src={item?.productImageUrl} alt={item?.name} />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="avatar placeholder">
                                                <div className="bg-primary text-primary-content rounded-full w-10">
                                                    <span className="text-sm">{item?.name?.charAt(0)}</span>
                                                </div>
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="card-title text-base lg:text-lg">{item?.name}</h2>
                                            <p className="text-sm text-base-content/70">ID: {item?.id}</p>
                                        </div>
                                    </div>
                                    {item?.isPopular ? (
                                        <span className="badge badge-success gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Популярный
                                        </span>
                                    ) : (
                                        <span className="badge badge-ghost gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Не популярный
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mt-2">
                                    <p className="text-sm flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span className="font-medium">Категория:</span> {item?.category?.name}
                                    </p>
                                    <p className="text-sm mt-1 line-clamp-2 flex items-start gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        <span>
                                            <span className="font-medium">Описание:</span> {item?.description}
                                        </span>
                                    </p>
                                </div>
                                
                                <div className="card-actions justify-end mt-4">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openEditProductModal(item)} 
                                            className="btn btn-info btn-sm gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Изменить
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item?.id)} 
                                            className="btn btn-error btn-sm gap-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <CreateAndEditProductModal updateProductList={() => call()} {...dataForEdit} items={dataItems?.data?.items} onClose={() => setDataForEdit(null)} />
            </div>
        </BaseLayout>
    )
}