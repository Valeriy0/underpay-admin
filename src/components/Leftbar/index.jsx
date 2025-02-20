import react from "react";
import { Dropdown } from "./dropdown";

const menu = [
    {
        page: '/products',
        name: 'Products',
    },
    {
        page: '/banners',
        name: 'Banners',
        submenu: [
            {
                page: '/banners/create',
                name: 'create',
            },
            {
                page: '/banners/list',
                name: 'Banners list',
            },
        ]
    },
]

export const Leftbar = () => {
    return (
        <div className="flex flex-col h-full items-start">
            <ul className="menu bg-base-200 rounded-box w-56">
            {menu.map((item, itemIndex) => {
                return (
                   <>
                        {!!item?.submenu && item?.submenu.length ? (
                            <Dropdown title={item?.name} submenu={item?.submenu}/>
                        ) : (
                            <li><a>{item?.name}</a></li>
                        )}
                    </>
                )
            })}
            </ul>
           
        </div>
    )
}