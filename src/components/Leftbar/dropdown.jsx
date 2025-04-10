import react, { useState } from "react";
import { Link } from "react-router-dom";

export const Dropdown = ({ title = '', submenu = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <li>
            <details open={isOpen}>
                <summary className="hover:bg-base-300 rounded-lg py-3">
                    {title}
                </summary>
                <ul className="menu bg-base-200 rounded-box">
                    {submenu?.map((item, itemIndex) => (
                        <li key={itemIndex}>
                            <Link 
                                to={item?.link} 
                                className="hover:bg-base-300 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                {item?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </details>
        </li>
    )
}