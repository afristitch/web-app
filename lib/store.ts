export function getStoreLink(): string {
    if (typeof window === 'undefined') return "https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en";
    const userAgent = window.navigator.userAgent || window.navigator.vendor;
    
    // Check iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "https://apps.apple.com/us/app/sew-digital/id6760103170";
    }
    
    // Default to Google Play (for Android and Desktop)
    return "https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en";
}

export function handleStoreClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    const link = getStoreLink();
    window.open(link, '_blank');
}
