import react from "react";

export const Input = ({title = '', value, onChange, type = 'text', placeholder = '', error = ''}) =>  {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text font-medium">{title}</span>
            </div>
            <input 
                type={type} 
                placeholder={placeholder} 
                className={`input input-bordered w-full ${error ? 'input-error' : ''}`} 
                value={value} 
                onChange={onChange}
            />
            {error && (
                <div className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </div>
            )}
        </label>
    )
}