import type { SegmentDisplayProps } from "./interfaces"
import {
    RUNIC_UNIT_SEGMENT_REPRESENTATIONS,
    SEGMENT_PATHS,
    SEGMENT_IDS,
} from "../../constants/runicRepresentations"
import styles from "./segmentDisplay.module.css"
import { useMemo } from "react"

const SegmentDisplay = ({
    value,
}: SegmentDisplayProps) => {
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

    return (
        <svg
            className={styles.segmentDisplay}
            viewBox="0 0 100 100"
            role="img"
        >
            <g transform="translate(25,-25)">
                {SEGMENT_IDS.filter((id) => id !== 0).map((id) => (
                    <path
                        key={`u-${id}`}
                        d={SEGMENT_PATHS[id]}
                        className={
                            unitSegments.has(id)
                                ? styles.segmentOn
                                : styles.segmentOff
                        }
                    />
                ))}
            </g>
            <g transform="translate(100,0) scale(-1,1) translate(25,-25)">
                {SEGMENT_IDS.filter((id) => id !== 0).map((id) => (
                    <path
                        key={`d-${id}`}
                        d={SEGMENT_PATHS[id]}
                        className={
                            decadeSegments.has(id)
                                ? styles.segmentOn
                                : styles.segmentOff
                        }
                    />
                ))}
            </g>
            <g transform="translate(0,100) scale(1,-1) translate(25,-25)">
                {SEGMENT_IDS.filter((id) => id !== 0).map((id) => (
                    <path
                        key={`h-${id}`}
                        d={SEGMENT_PATHS[id]}
                        className={
                            hundredSegments.has(id)
                                ? styles.segmentOn
                                : styles.segmentOff
                        }
                    />
                ))}
            </g>
            <g transform="translate(100,0) scale(-1,1) translate(0,100) scale(1,-1) translate(25,-25)">
                {SEGMENT_IDS.filter((id) => id !== 0).map((id) => (
                    <path
                        key={`t-${id}`}
                        d={SEGMENT_PATHS[id]}
                        className={
                            thousandSegments.has(id)
                                ? styles.segmentOn
                                : styles.segmentOff
                        }
                    />
                ))}
            </g>
            <path
                d="M50 0 L50 100"
                className={
                    !value ? styles.segmentOff : styles.segmentOn
                }
            />
        </svg>
    )
}

export default SegmentDisplay