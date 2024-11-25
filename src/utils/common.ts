import dayjs from 'dayjs';

export const percentMovie = (voteAverage: number) => {
    const percent = Math.round(voteAverage * 10);

    if (percent >= 70) {
        return {
            percent: percent,
            strokeColor: '#21d07a',
            trailColor: '#204529',
        };
    }

    return {
        percent: percent,
        strokeColor: '#d2d531',
        trailColor: '#423d0f',
    };
};

export const formatDate = (dateStr: string) => {
    const date: Date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
};

export const formatTitle = (title: string): string => {
    const formattedTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');

    return formattedTitle;
};

export const formatRuntime = (runtimeVal: number): string => {
    const hours = Math.floor(runtimeVal / 60);
    const remainingMinutes = runtimeVal % 60;

    return `${hours}h ${remainingMinutes}m`;
};

export const formatDateTimeJS = (date: string | number, format: string): string => {
    return dayjs(date).format(format);
};

export const formatCurrency = (value: number | string): string => {
    const number = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};

export const getThumbnailYoutube = (key: string): string => {
    return `https://i.ytimg.com/vi/${key}/hqdefault.jpg`;
};
