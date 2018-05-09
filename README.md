# traffic-cam-seattle
This web app represents the locations of SDOT- and WSDOT-maintained traffic cameras in Seattle, WA.

The project was started by generating an index html file and folder structure that included 'project-files' for storing source data, 'build-scripts' for storing Node JS files, and 'data' for storing cleaned data.

Seattle City Council Districts were obtained from [City of Seattle Open Data Portal](https://data.seattle.gov/dataset/Council-Districts/wud8-na47)
Seattle traffic camera data from [City of Seattle Open Data Portal](https://data.seattle.gov/Transportation/Seattle-Traffic-Cameras/65fc-btcc)
Color from [CARTOColors](https://github.com/CartoDB/cartocolor)

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
The Council Districts layer was styled with the Prism spectrum from CartoColors. Mouse off and mouse on features were added to provide an interactive element for users.
