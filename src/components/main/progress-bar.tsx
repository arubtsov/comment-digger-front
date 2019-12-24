import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const componentStyle = {
    height: '3px'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const style = {
        width: `${progress}%`
    };

    return (
        <div className="progress md-progress mb-2" style={componentStyle}>
            <div className="progress-bar bg-info" role="progressbar" style={style} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
        </div>        
    );
};

export default ProgressBar;
