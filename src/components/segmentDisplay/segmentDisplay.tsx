import type { SegmentDisplayProps } from "./interfaces"
import {
    RUNIC_UNIT_SEGMENT_REPRESENTATIONS,
    SEGMENT_PATHS,
    SEGMENT_IDS,
    SEGMENT_COLORS,
} from "../../constants/runicRepresentations"
import styles from "./segmentDisplay.module.css"
import { useMemo, useRef } from "react"
import SvgIcon from "../svgIcon/svgIcon"
import DownloadIcon from "../../assets/download.svg?react"

const SegmentDisplay = ({
    value,
}: SegmentDisplayProps) => {
    const svgRef = useRef<SVGSVGElement>(null)

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

    const handleDownload = () => {
        if (!svgRef.current) return

        // Using anchor element injection to avoid local file system access API limitations
        const svgData = new XMLSerializer().serializeToString(svgRef.current)
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
        const svgUrl = URL.createObjectURL(svgBlob)
        const downloadLink = document.createElement("a")
        downloadLink.href = svgUrl
        downloadLink.download = `runic-${value}.svg`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        URL.revokeObjectURL(svgUrl)
    }

    return (
        <div className={styles.segmentDisplayContainer}>
            <svg
                ref={svgRef}
                className={styles.segmentDisplay}
                viewBox="0 0 100 100"
                role="img"
            >
                <g transform="translate(25,-25)">
                    {SEGMENT_IDS.map((id) => {
                        const isOn = unitSegments.has(id)

                        return (
                            <path
                                key={`u-${id}`}
                                d={SEGMENT_PATHS[id]}
                                fill={isOn ? SEGMENT_COLORS.on : undefined}
                                stroke={isOn ? SEGMENT_COLORS.off : undefined}
                                visibility={isOn ? undefined : "hidden"}
                            />
                        )
                    })}
                </g>
                <g transform="translate(100,0) scale(-1,1) translate(25,-25)">
                    {SEGMENT_IDS.map((id) => {
                        const isOn = decadeSegments.has(id)

                        return (
                            <path
                                key={`d-${id}`}
                                d={SEGMENT_PATHS[id]}
                                fill={isOn ? SEGMENT_COLORS.on : undefined}
                                stroke={isOn ? SEGMENT_COLORS.off : undefined}
                                visibility={isOn ? undefined : "hidden"}
                            />
                        )
                    })}
                </g>
                <g transform="translate(0,100) scale(1,-1) translate(25,-25)">
                    {SEGMENT_IDS.map((id) => {
                        const isOn = hundredSegments.has(id)

                        return (
                            <path
                                key={`h-${id}`}
                                d={SEGMENT_PATHS[id]}
                                fill={isOn ? SEGMENT_COLORS.on : undefined}
                                stroke={isOn ? SEGMENT_COLORS.off : undefined}
                                visibility={isOn ? undefined : "hidden"}
                            />
                        )
                    })}
                </g>
                <g transform="translate(100,0) scale(-1,1) translate(0,100) scale(1,-1) translate(25,-25)">
                    {SEGMENT_IDS.map((id) => {
                        const isOn = thousandSegments.has(id)

                        return (
                            <path
                                key={`t-${id}`}
                                d={SEGMENT_PATHS[id]}
                                fill={isOn ? SEGMENT_COLORS.on : undefined}
                                stroke={isOn ? SEGMENT_COLORS.off : undefined}
                                visibility={isOn ? undefined : "hidden"}
                            />
                        )
                    })}
                </g>
                <path
                    d="M50 0 L50 100"
                    fill={value ? SEGMENT_COLORS.on : undefined}
                    stroke={value ? SEGMENT_COLORS.off : undefined}
                    visibility={value ? undefined : "hidden"}
                />
            </svg>
            <button
                onClick={handleDownload}
                className={styles.downloadButton}
                title="Download SVG"
            >
                <SvgIcon svgIcon={DownloadIcon} color="white" />
            </button>
        </div>
    )
}

export default SegmentDisplay