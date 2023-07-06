export function formulaDistanza(latitude1: number, longitude1: number, latitude2: number, longitude2: number): number {
    let theta: number = longitude1 - longitude2;
    let distance: number = 60 * 1.1515 * (180 / Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
        Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
    );
    return Math.round(distance * 1.609344 * 100) / 100;
}