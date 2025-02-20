import react, { useEffect } from "react";
import { BaseLayout } from "../../layouts/BaseLayout";
import { useRequest } from "../../helpers/hooks/useRequest";
import { ProductsRepository } from "../../connectors/repositories/product";
import { CreateProductForm } from "../../features/createForms/CreateProductForm";
import { CreateCategoryForm } from "../../features/createForms/CreateCategoryForm";

export const ProductsPage = () => {
    const { call, data } = useRequest(ProductsRepository.getProducts);

    useEffect(() => {
        call();
    }, [])

    console.log(data);

    return (
        <BaseLayout>
            <CreateProductForm />
            <div className="w-full border border-solid border-[#fff] h-[2px]"></div>
            <CreateCategoryForm />

        </BaseLayout>
    )
}