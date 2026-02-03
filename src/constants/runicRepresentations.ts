export const RUNIC_UNIT_SEGMENT_REPRESENTATIONS: Record<number, number[]> = {
    0: [],
    1: [1],
    2: [2],
    3: [3],
    4: [4],
    5: [1, 4],
    6: [5],
    7: [1, 5],
    8: [2, 5],
    9: [1, 2, 5]
}

export const SEGMENT_PATHS: Record<number, string> = {
    // 0 – left vertical
    0: "M25 25 L25 75",
    // 1 – top horizontal
    1: "M25 25 L75 25",
    // 2 – bottom horizontal
    2: "M25 75 L75 75",
    // 3 – top‑left to bottom‑right diagonal
    3: "M25 25 L75 75",
    // 4 – bottom‑left to top‑right diagonal
    4: "M25 75 L75 25",
    // 5 – right vertical
    5: "M75 25 L75 75",
}

export const SEGMENT_IDS = [1, 2, 3, 4, 5] as const

export const SEGMENT_COLORS = {
    on: "#00ff7f",
    off: "#00c060",
}