const COLORS:string[] = [
        '#4F46E5', // Indigo 600 – modern trust blue
        '#0EA5E9', // Sky 500 – bright tech cyan
        '#14B8A6', // Teal 500 – calm, professional
        '#10B981', // Emerald 500 – neutral green
        '#F59E0B', // Amber 500 – warm highlight (ties with your brand)
        '#7C3AED', // Violet 600 – creative accent
        '#DB2777', // Rose 600 – energetic but not playful
        '#64748B', // Slate 500 – neutral gray for balance
        '#1E3A8A', // Blue 800 – deep contrast
        '#0369A1'  // Cyan 700 – trustworthy corporate tone
    ];

function isColorLight(hex: string) {
  const c = hex.substring(1); // remove #
  const rgb = parseInt(c, 16); 
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  // Perceived luminance (WCAG formula)
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  return luma > 180; // threshold tweakable
}

export function getProfileIcon (fullName: string) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
        const [first, last] = [parts[0], parts[parts.length - 1]];
        return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
    }
    const name = parts[0] ?? "";
    return name.slice(0, 2).toUpperCase();
};

export function getTextColor(userColor:string) {
    return  isColorLight(userColor) ? '#0f172a' : '#f8fafc';
}

export function getUserColor(userId:string) {
    let num:number = 0
    for (let i = 0; i < userId.length; i++) {
        num += userId.charCodeAt(i);

    }
    return COLORS[num%COLORS.length];
}