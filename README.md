# traffic-cam-seattle
This web app represents the locations of SDOT- and WSDOT-maintained traffic cameras in Seattle, WA.

Added Index and file structure

Obtained Seattle Neighborhoods from [Data.gov](https://catalog.data.gov/dataset?tags=neighborhood&organization_type=City+Government&res_format=ZIP)

Examined Neighborhoods Shapefile in Terminal and transform into a GeoJSON file

```
$ cd neighborhoods/
$ ls
StatePlane      WGS84
$ cd wgs84
$ ogrinfo -so Neighborhoods.shp Neighborhoods
    INFO: Open of `Neighborhoods.shp'
        using driver `ESRI Shapefile' successful.

    Layer name: Neighborhoods
    Metadata:
    DBF_DATE_LAST_UPDATE=2014-11-07
    Geometry: Polygon
    Feature Count: 119
    Extent: (-122.435956, 47.495514) - (-122.236044, 47.734165)
    Layer SRS WKT:
    GEOGCS["GCS_WGS_1984",
        DATUM["WGS_1984",
            SPHEROID["WGS_84",6378137.0,298.257223563]],
        PRIMEM["Greenwich",0.0],
        UNIT["Degree",0.0174532925199433],
        AUTHORITY["EPSG","4326"]]
    OBJECTID: Integer64 (10.0)
    AREA: Real (15.3)
    PERIMETER: Real (15.3)
    HOODS_: Integer64 (11.0)
    HOODS_ID: Integer64 (11.0)
    S_HOOD: String (26.0)
    L_HOOD: String (26.0)
    L_HOODID: Integer (3.0)
    SYMBOL: Integer (3.0)
    SYMBOL2: Integer (3.0)
    SHAPE_AREA: Real (19.11)
    SHAPE_LEN: Real (19.11)
$ ogr2ogr -f "GeoJSON" ../neighborhoods.json Neighborhoods.shp
```