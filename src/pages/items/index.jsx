import React, { useEffect, useState } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { useRequest } from "../../helpers/hooks/useRequest";
import { ItemsRepository } from "../../connectors/repositories/items";
import { EditItemModal } from "../../features/Items/EditItemModal";

export const ItemsPage = () => {
    const [dataForEdit, setDataForEdit] = useState(null);
    const { call, data } = useRequest(ItemsRepository.getItems);

    useEffect(() => {
        call();
    }, []);

    // Проверяем, что data существует и является массивом
    const items = Array.isArray(data?.data?.items) ? data.data.items : [];

    const openEditItemModal = (itemInfo) => {
        setDataForEdit(itemInfo);
        document.getElementById('editItem_modal').showModal();
    }

    return (
        <BaseLayout>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Айтемы</h1>
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Иконка
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Цена
                                    </div>
                                </th>
                                <th>
                                    <div className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Действия
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, itemIndex) => (
                                <tr key={itemIndex} className="hover">
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono">{item?.id}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {item?.iconImageUrl ? (
                                                <div className="avatar">
                                                    <div className="w-8 h-8 rounded">
                                                        <img src={item?.iconImageUrl} alt={item?.name} />
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
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span>{item?.iconImageUrl ? 'Есть' : 'Нет'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <span className="font-mono">{item?.price}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => openEditItemModal(item)} 
                                                className="btn btn-info btn-sm gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Изменить
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
                    {items.map((item, itemIndex) => (
                        <div key={itemIndex} className="card bg-base-200 shadow-xl">
                            <div className="card-body p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="card-title text-base lg:text-lg">{item?.name}</h2>
                                        <p className="text-sm text-base-content/70">ID: {item?.id}</p>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm">
                                        <span className="font-medium">Цена:</span> {item?.price}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Иконка:</span> {item?.iconImageUrl ? 'Есть' : 'Нет'}
                                    </p>
                                </div>
                                <div className="card-actions justify-end mt-4">
                                    <button 
                                        onClick={() => openEditItemModal(item)} 
                                        className="btn btn-info btn-sm gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Изменить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <EditItemModal 
                    updateItemList={() => call([{ region: 'us' }])} 
                    {...dataForEdit} 
                    onClose={() => setDataForEdit(null)} 
                />
            </div>
        </BaseLayout>
    );
}; 