export default function coordinateValidator(v) {
  if (v) {
    const [lat, long] = v.replace(/,/g, '').split(' ');
    if (!lat || !long) return false;
    if (parseFloat(lat) > 90 || parseFloat(lat) < -90) {
      return false;
    }
    if (parseFloat(long) > 180 || parseFloat(long) < -180) {
      return false;
    }
    return true;
  }
  return false;
}
