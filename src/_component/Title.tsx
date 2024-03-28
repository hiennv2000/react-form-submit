import React from 'react'

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
    title: string;
    subTitle?: string;
}

export const Title = ({ title, subTitle }: TitleProps) => {
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
                {title}
            </h2>
            {subTitle &&
                <p className="mt-2 text-base md:text-lg leading-8 text-black/50">
                    {subTitle}
                </p>
            }
        </div>
    )
}
