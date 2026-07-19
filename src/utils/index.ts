export const hijriFormatter = (formattype: string) => {
    if (formattype === "all") {
        return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
    if (formattype === "dayMonth") {
        return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
            day: '2-digit',
            month: 'long',
        });
    }
    return new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        month: 'long',
        year: 'numeric'
    });
}