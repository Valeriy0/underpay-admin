import react from "react";
import { Dropdown } from "./dropdown";
import { Link } from "react-router-dom";

const menu = [
    {
        link: '/banners',
        name: 'Banners',
    },
    {
        link: '/categories',
        name: 'Categories',
    },
    {
        link: '/products',
        name: 'Products',
    },
]

export const Leftbar = () => {
    return (
        <div className="flex flex-col h-full items-start space-y-10 p-[1rem]">
            <div className="flex items-center justify-start h-[3rem]">
                <span className="font-bold text-3xl">Underpay</span>
            </div>
            <ul className="menu bg-base-200 rounded-box w-56">
            {menu.map((item, itemIndex) => {
                return (
                   <>
                        {!!item?.submenu && item?.submenu.length ? (
                            <Dropdown title={item?.name} submenu={item?.submenu}/>
                        ) : (
                            <li><Link to={item?.link}>{item?.name}</Link></li>
                        )}
                    </>
                )
            })}
            </ul>
           
        </div>
    )
}