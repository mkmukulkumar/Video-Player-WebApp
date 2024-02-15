export default function convertSeconds (seconds: number): string {
    const hrs = Math.floor(seconds / (60*60))
    const mm = Math.floor((seconds-(hrs*60*60))/60)
    const ss=Math.floor((seconds-mm*60))
    return `${String(hrs).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
}