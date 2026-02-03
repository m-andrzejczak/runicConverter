import { useMemo } from "react"
import type { SvgIconProps } from "./interfaces"
import styles from "./svgIcon.module.css"

const SvgIcon = ({ svgIcon: Icon, width = 16, height = 16, color, style, className, ...props }: SvgIconProps) => {
    const iconStyle = useMemo(() => {
        const baseStyle = style || {}

        if (color) {
            return {
                ...baseStyle,
                color,
            }
        }

        return baseStyle
    }, [color, style])

    const combinedClassName = useMemo(() => {
        return className ? `${styles.svgIcon} ${className}` : styles.svgIcon
    }, [className])

    return (
        <Icon
            width={width}
            height={height}
            className={combinedClassName}
            style={iconStyle}
            {...props}
        />
    );
};

export default SvgIcon