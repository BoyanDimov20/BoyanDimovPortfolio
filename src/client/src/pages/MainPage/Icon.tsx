import React from "react";

interface IconProperties {
    src: string,
    className?: string
};

const Icon = ({ src, className }: IconProperties) => {
    return (
        <img className={className} src={src} width="40px" height="40px" />
    )
};

export default Icon;
