import react from "react";

export const Toggle = ({ title = "", isToggled, handleToggle, disabled = false }) => {
    return (
        <div className="form-control w-full">
            <label className="label cursor-pointer justify-start gap-4">
                <span className="label-text font-medium">{title}</span>
                <input 
                    type="checkbox" 
                    className={`toggle toggle-primary toggle-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    checked={isToggled} 
                    onChange={handleToggle}
                    disabled={disabled}
                />
            </label>
        </div>
    )
}