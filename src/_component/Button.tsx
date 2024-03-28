import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../libs/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center outline-none whitespace-nowrap space-x-1 disabled:bg-gray-400 duration-150",
    {
        variants: {
            fill: {
                none: undefined,
                default: "bg-[#9089fc] hover:bg-[#9089fc] active:bg-[#9089fc] text-black",
                white: "bg-white text-black hover:bg-[#F5F5F5]",
                transparent: "bg-transparent text-black",
                red: "bg-[#CB2026] hover:bg-[#CB2026] active:bg-[#CB2026] text-white",
                secondary: "bg-[#F5F5F5] hover:bg-[#F5F5F5] active:bg-[#F5F5F5] text-black",
                outline: "border hover:bg-[#F5F5F5] active:bg-[#F5F5F5] text-black"
            },
            size: {
                none: undefined,
                default:
                    "h-11 md:h-[52px] px-5 pt-2 pb-2.5 text-sm md:text-base font-bold uppercase",
                sm: "px-3 py-2 h-7 md:h-[34px] text-[10px] md:text-xs font-semibold uppercase",
                lg: "h-12 px-6 pt-3 pb-4 text-sm md:text-base font-bold uppercase",
                xl: "h-14 p-4 text-base font-bold",
            },
            shadow: {
                none: "shadow-none",
                sm: "shadow-sm",
                lg: "shadow-lg",
            },
            rounded: {
                default: "rounded-xl",
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                xxl: "rounded-2xl",
                xxxl: "rounded-3xl",
                full: "rounded-3xl",
            },
            border: {
                gray: "border border-gray-400",
                red: "border border-red-400",
            },
            expand: {
                default: undefined,
                full: "w-full rounded-0",
                block: "w-full",
            },
        },
        defaultVariants: {
            fill: "default",
            size: "default",
            rounded: "default",
        },
    },
);

export interface ButtonProps
    extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
    asLink?: boolean;
    href?: string;
    linkTarget?: string;
}

const Button = ({
    asLink = false,
    href,
    children,
    className,
    linkTarget = "_self",
    ...props
}: ButtonProps) => {
    const { size, fill, border, rounded, expand, shadow, ...restProps } = props;
    const displayClasses = cn(
        buttonVariants({
            size,
            fill,
            border,
            rounded,
            expand,
            shadow,
        }),
        className,
    );

    if (!restProps.disabled && asLink && href) {
        const url = href || "";
        return (
            <a className={displayClasses} target={linkTarget} href={url}>
                {children}
            </a>
        );
    }

    return (
        <button className={displayClasses} {...restProps}>
            {children}
        </button>
    );
};

export { Button, buttonVariants };
