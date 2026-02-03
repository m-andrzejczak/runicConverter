import { useCallback, useState } from "react"
import SegmentDisplay from "../../components/segmentDisplay/segmentDisplay"
import styles from "./converter.module.css"

const Converter = () => {
    const [value, setValue] = useState(0)
    const [inputValue, setInputValue] = useState("")

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

    return (
        <div className={styles.converter}>
            <label className={styles.converterLabel}>
                <span>Number (0–9999)</span>
                <input
                    type="text"
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className={styles.converterInput}
                    value={inputValue}
                    onChange={handleChange}
                    min={0}
                    max={9999}
                />
            </label>

            <div className={styles.converterDisplay}>
                <SegmentDisplay value={value} />
            </div>
        </div>
    )
}

export default Converter