Number EARTH_RADIUS = 6378; // kilometers
Number squareDistance(Point point1, Point point2) {
  Number diffLat = point1.lat - point2.lat;
  Number diffLong = point2.long-point2.long;
  Number middleCos = Math.cos((point1.lat - point2.lat)/2);
  return 
}
