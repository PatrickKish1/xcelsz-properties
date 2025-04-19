export function timeAgo(isoDate) {
    const now = new Date();
    const date = new Date(isoDate);
    const elapsed = now - date;

    const units = [
        { label: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
        { label: 'month', ms: 30 * 24 * 60 * 60 * 1000 },
        { label: 'week', ms: 7 * 24 * 60 * 60 * 1000 },
        { label: 'day', ms: 24 * 60 * 60 * 1000 },
        { label: 'hour', ms: 60 * 60 * 1000 },
        { label: 'minute', ms: 60 * 1000 },
        { label: 'second', ms: 1000 }
    ];

    for (const unit of units) {
        const value = Math.floor(elapsed / unit.ms);
        if (value >= 1) {
            return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-value, unit.label);
        }
    }

    return 'just now';
}

export function formatDate(isoDate) {
    const date = new Date(`${isoDate}`);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}