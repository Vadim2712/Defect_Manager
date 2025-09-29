export function exportToCsv(filename, rows) {
    if (!rows || !rows.length) return
    const keys = Object.keys(rows[0])
    const lines = [keys.join(',')]
    for (const row of rows) {
        const values = keys.map(k => {
            const v = row[k] === null || row[k] === undefined ? '' : String(row[k])
            return `"${v.replace(/"/g, '""')}"`
        })
        lines.push(values.join(','))
    }
    const csv = lines.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
