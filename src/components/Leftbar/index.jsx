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
    {
        link: '/items',
        name: 'Items',
    },
]

export const Leftbar = () => {
    return (
        <div className="p-4 bg-base-200 h-full">
            <div className="flex items-center justify-start h-16 w-full px-4 mb-6">
                <span className="font-bold text-2xl text-primary">Underpay</span>
            </div>
            <ul className="menu menu-lg bg-base-200 rounded-box w-full">
                {menu.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-2">
                        {!!item?.submenu && item?.submenu.length ? (
                            <Dropdown 
                                title={item?.name} 
                                submenu={item?.submenu}
                            />
                        ) : (
                            <Link 
                                to={item?.link} 
                                className="hover:bg-base-300 rounded-lg"
                            >
                                {item?.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}