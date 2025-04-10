import react from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { setCookie } from "nookies";
import { BaseLayout } from "../../layouts/BaseLayout";

export const MainPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
  
    useEffect(() => {
      if (searchParams.get('token')) {
        setCookie(null, 'apiToken', searchParams.get('token'), {
          maxAge: 30 * 24 * 60 * 60
        });
        setSearchParams({});
        navigate('/');
      }
    }, [searchParams])

    return (
        <BaseLayout>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="card bg-base-200 shadow-xl flex-1">
                    <div className="card-body">
                        <h2 className="card-title text-lg lg:text-xl">Добро пожаловать в Underpay Admin</h2>
                        <p className="text-sm lg:text-base">Выберите раздел в меню слева для начала работы.</p>
                    </div>
                </div>
                
                <div className="card bg-base-200 shadow-xl flex-1">
                    <div className="card-body">
                        <h2 className="card-title text-lg lg:text-xl">Быстрые действия</h2>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <button className="btn btn-primary btn-sm lg:btn-md">Добавить баннер</button>
                            <button className="btn btn-secondary btn-sm lg:btn-md">Добавить категорию</button>
                            <button className="btn btn-accent btn-sm lg:btn-md">Добавить продукт</button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    )
}