# traffic-cam-seattle
This web app represents the locations of SDOT- and WSDOT-maintained traffic cameras in Seattle, WA.


Seattle Traffic Camera data from [City of Seattle Open Data Portal](https://data.seattle.gov/Transportation/Seattle-Traffic-Cameras/65fc-btcc)
Color Scheme from [CARTOColors](https://github.com/CartoDB/cartocolor)

Examined Council Districts Shapefile in Terminal and transform into a GeoJSON file

```
$ ogrinfo -so Council_Districts.shp Council_Districts
    INFO: Open of `Council_Districts.shp'
        using driver `ESRI Shapefile' successful.

    Layer name: Council_Districts
    Geometry: Polygon
    Feature Count: 7
    Extent: (-122.435958, 47.495568) - (-122.236012, 47.734143)
    Layer SRS WKT:
    GEOGCS["GCS_WGS_1984",
        DATUM["WGS_1984",
            SPHEROID["WGS_84",6378137,298.257223563]],
        PRIMEM["Greenwich",0],
        UNIT["Degree",0.017453292519943295],
        AUTHORITY["EPSG","4326"]]
    OBJECTID: Integer64 (10.0)
    C_DISTRICT: Integer64 (10.0)
    DISPLAY_NA: String (80.0)
    Shape_Leng: Real (24.15)
    Shape_Area: Real (24.15)
$ ogr2ogr -f "GeoJSON" ../../data/council-districts.json Council_Districts.shp
```
