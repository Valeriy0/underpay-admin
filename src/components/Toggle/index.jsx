import react from "react";

export const Toggle = ({ title = "", isToggled, handleToggle }) => {
    return (
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">{title}</span>
                <input type="checkbox" className="toggle toggle-success" checked={isToggled} onChange={handleToggle} />
            </label>
        </div>
    )
}