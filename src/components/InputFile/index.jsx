import react from "react";

export const InputFile = ({ title, onChange, error = '' }) => {
    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text font-medium">{title}</span>
            </div>
            <input 
                type="file" 
                className={`file-input file-input-bordered w-full ${error ? 'file-input-error' : ''}`} 
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