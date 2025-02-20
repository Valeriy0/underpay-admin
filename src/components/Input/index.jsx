import react from "react";

export const Input = ({title = 'What is your name?', value, onChange, type = 'text', placeholder = '11'}) =>  {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{title}</span>
            </div>
            <input type={type} placeholder={placeholder} className="input input-bordered w-full max-w-xs" value={value} onChange={onChange} />
        </label>
    )
}