import React, { CSSProperties } from 'react';

interface ProgressBarProps {
    progress: number;
}

const componentStyle = {
    height: '3px'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const progressStyle: CSSProperties = {
        width: `${progress}%`
    };

    return (
        <div className="progress md-progress mb-2 flex-shrink-0" style={componentStyle}>
            <div style={progressStyle}
                 className="progress-bar bg-info" role="progressbar"
                 aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            </div>
        </div>
    );
};

export default ProgressBar;
