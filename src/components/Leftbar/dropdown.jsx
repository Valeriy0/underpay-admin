import react, { useState } from "react";

export const Dropdown = ({ title = '1234', submenu = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <span onClick={() => setIsOpen((prev) => !prev)} className={`menu-dropdown-toggle ${isOpen ? 'menu-dropdown-show' : ''}`}>{title}</span>
            <ul className={`menu-dropdown ${isOpen ? 'menu-dropdown-show' : ''} `}>
                {submenu?.map((item, itemIndex) => {
                    return (
                        <li><a>{item?.name}</a></li>
                    )
                })}
            </ul>
        </li>
    )
}