import react from "react";

export const Input = ({title = '', value, onChange, type = 'text', placeholder = ''}) =>  {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text">{title}</span>
            </div>
            <input type={type} placeholder={placeholder} className="input input-bordered w-full" value={value} onChange={onChange} />
        </label>
    )
}