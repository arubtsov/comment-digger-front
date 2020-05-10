import React, { ButtonHTMLAttributes } from 'react'

const CLASS_NAME = 'form-control btn btn-primary mb-2 d-flex align-items-center justify-content-center'

const PrimaryButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> =
    ({ children, className, ...props }) => {
        const buttonClassName = [CLASS_NAME, className].join(' ');

        return (
            <button className={buttonClassName} {...props}>
                {children}
            </button>
        )
    }

export default PrimaryButton
