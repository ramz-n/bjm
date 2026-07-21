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

export const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
        alert("This browser does not support notifications.");
        return false;
    }
    if (Notification.permission === "granted") return true;
    if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }
    return false;
};