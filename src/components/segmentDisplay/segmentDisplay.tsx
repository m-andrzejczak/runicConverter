import type { SegmentDisplayProps } from "./interfaces"
import {
    RUNIC_UNIT_SEGMENT_REPRESENTATIONS,
    SEGMENT_PATHS,
    SEGMENT_IDS,
    STROKE_STYLE,
    SVG_CANVAS_SIZE,
    SVG_SCALE_FACTOR,
} from "../../constants/runicRepresentations"
import styles from "./segmentDisplay.module.css"
import { useMemo, useRef, useEffect } from "react"

const SegmentDisplay = ({
    value,
    onSvgRef,
}: SegmentDisplayProps) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const strokePadding = parseFloat(STROKE_STYLE.strokeWidth) * SVG_SCALE_FACTOR / 2
    const viewBoxPadding = strokePadding
    const viewBoxSize = SVG_CANVAS_SIZE + viewBoxPadding * 2

    const { units, decades, hundreds, thousands } = useMemo(() => {
        return {
            units: value % 10,
            decades: Math.floor(value / 10) % 10,
            hundreds: Math.floor(value / 100) % 10,
            thousands: Math.floor(value / 1000) % 10,
        }
    }, [value])

    const [unitSegments, decadeSegments, hundredSegments, thousandSegments] = useMemo(() => {
        const unitsHundredsOverlap = hundreds === 2 && units === 2;
        const decadesThousandsOverlap = thousands === 2 && decades === 2;

        return [
            new Set(RUNIC_UNIT_SEGMENT_REPRESENTATIONS[units] ?? []),
            new Set(RUNIC_UNIT_SEGMENT_REPRESENTATIONS[decades] ?? []),
            new Set(RUNIC_UNIT_SEGMENT_REPRESENTATIONS[hundreds].filter((id) => !unitsHundredsOverlap || id !== 2)),
            new Set(RUNIC_UNIT_SEGMENT_REPRESENTATIONS[thousands].filter((id) => !decadesThousandsOverlap || id !== 2)),
        ]
    }, [units, decades, hundreds, thousands])

    useEffect(() => {
        if (onSvgRef) {
            onSvgRef(svgRef.current)
        }
    }, [onSvgRef])

    const renderSegmentPath = (id: number, isOn: boolean, keyPrefix: string) => (
        <path
            key={`${keyPrefix}-${id}`}
            d={SEGMENT_PATHS[id]}
            fill={STROKE_STYLE.fill}
            stroke={isOn ? STROKE_STYLE.stroke : undefined}
            strokeWidth={STROKE_STYLE.strokeWidth}
            strokeLinecap={STROKE_STYLE.strokeLinecap}
            strokeLinejoin={STROKE_STYLE.strokeLinejoin}
            opacity={isOn ? STROKE_STYLE.opacity : 0}
            visibility={isOn ? undefined : "hidden"}
        />
    )

    return (
        <div className={styles.segmentDisplayContainer}>
            <svg
                ref={svgRef}
                viewBox={`-${viewBoxPadding} -${viewBoxPadding} ${viewBoxSize} ${viewBoxSize}`}
                style={{ width: `${SVG_CANVAS_SIZE}px`, height: `${SVG_CANVAS_SIZE}px`, overflow: "hidden" }}
                role="img"
            >
                <defs>
                    <filter id="filter" height="2" width="2">

                    </filter>
                </defs>
                <g transform={`scale(${SVG_SCALE_FACTOR})`}>
                    <g transform="translate(25,-25)">
                        {SEGMENT_IDS.map((id) => renderSegmentPath(id, unitSegments.has(id), "u"))}
                    </g>
                    <g transform="translate(100,0) scale(-1,1) translate(25,-25)">
                        {SEGMENT_IDS.map((id) => renderSegmentPath(id, decadeSegments.has(id), "d"))}
                    </g>
                    <g transform="translate(0,100) scale(1,-1) translate(25,-25)">
                        {SEGMENT_IDS.map((id) => renderSegmentPath(id, hundredSegments.has(id), "h"))}
                    </g>
                    <g transform="translate(100,0) scale(-1,1) translate(0,100) scale(1,-1) translate(25,-25)">
                        {SEGMENT_IDS.map((id) => renderSegmentPath(id, thousandSegments.has(id), "t"))}
                    </g>
                    <path
                        d="M50 0 L50 100"
                        fill={STROKE_STYLE.fill}
                        stroke={value ? STROKE_STYLE.stroke : undefined}
                        strokeWidth={STROKE_STYLE.strokeWidth}
                        strokeLinecap={STROKE_STYLE.strokeLinecap}
                        strokeLinejoin={STROKE_STYLE.strokeLinejoin}
                        opacity={value ? STROKE_STYLE.opacity : 0}
                        visibility={value ? undefined : "hidden"}
                    />
                </g>
            </svg>
        </div>
    )
}

export default SegmentDisplay