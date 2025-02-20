import react from "react";

export const InputFile = ({ title, onChange }) => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{title}</span>
            </div>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={onChange} />
        </label>
    )
}