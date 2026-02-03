import { useCallback, useState, useRef } from "react"
import SegmentDisplay from "../../components/segmentDisplay/segmentDisplay"
import styles from "./converter.module.css"
import SvgIcon from "../../components/svgIcon/svgIcon"
import DownloadIcon from "../../assets/download.svg?react"

const Converter = () => {
    const [value, setValue] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const svgRef = useRef<SVGSVGElement | null>(null)

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 4)
        setInputValue(digitsOnly)

        if (!digitsOnly) {
            setValue(0)
            return
        }

        const numeric = Number(digitsOnly)
        setValue(Number.isNaN(numeric) ? 0 : numeric)
    }, [])

    const handleDownload = useCallback(() => {
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
    }, [value])

    return (
        <div className={styles.converter}>
            <label className={styles.converterLabel}>
                <span>Convert number to runic representation</span>
                <span>(0–9999)</span>
                <input
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    className={styles.converterInput}
                    value={inputValue}
                    onChange={handleChange}
                    min={0}
                    max={9999}
                />
            </label>

            <div className={styles.converterDisplay}>
                <SegmentDisplay value={value} onSvgRef={(svg) => { svgRef.current = svg }} />
                <button
                    onClick={handleDownload}
                    className={styles.downloadButton}
                    title="Download SVG"
                >
                    <SvgIcon svgIcon={DownloadIcon} color="white" />
                </button>
            </div>
        </div>
    )
}

export default Converter