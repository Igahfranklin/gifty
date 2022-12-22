import React from "react";

export default function BaseLayout ({ children }) {
    return (
        <div className="min-h-screen bg-primary bg-backgroundImage bg-cover bg-no-repeat">
        {children}
        </div>
    );
};
