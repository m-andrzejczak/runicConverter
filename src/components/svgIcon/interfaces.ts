import type { FC, SVGProps } from "react"

interface SvgIconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
    svgIcon: FC<SVGProps<SVGSVGElement>>
    width?: number
    height?: number
    color?: string
}

export type { SvgIconProps }