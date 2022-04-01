from geo.Geoserver import Geoserver


geo = Geoserver('http://127.0.0.1:8080/geoserver', username='admin', password='geoserver')

# For creating workspace
geo.create_workspace('demo')

# For uploading raster data to the geoserver
geo.create_coveragestore(layer_name='raster1', path=r'/home/jaki/Dev/JTRO/jtro_geo/data/raster/raster1.tif', workspace='demo')


# For creating postGIS connection and publish postGIS table
geo.create_featurestore(
    store_name='geo_postgis',
    workspace='demo',
    db='jtrogeo',
    host='127.0.0.1',
    pg_user='admin',
    pg_password='postgis'
)

geo.publish_featurestore(
    workspace='demo',
    store_name='geo_postgis',
    pg_table='jamoat-db'
)


# For uploading SLD file and connect it with layer
geo.upload_style(
    path=r'/home/jaki/Dev/JTRO/jtro_geo/data/style/raster1.sld',
    workspace='demo'
)
geo.publish_style(layer_name='jamoat-db', style_name='raster1', workspace='demo', sld_version='1.0.0')


# For creating the style file for raster data dynamically and connect it with layer
geo.create_coveragestyle(
    raster_path=r'/home/jaki/Dev/JTRO/jtro_geo/data/raster/raster1.tif',
    style_name='raster1',
    workspace='demo',
    color_ramp='RdYiGn'
)
geo.publish_style(layer_name='jamoat-db', style_name='raster1', workspace='demo')

# delete workspace
geo.delete_workspace(workspace='demo')

# delete layer
geo.delete_layer(layer_name='raster1', workspace='demo')

# delete style file
geo.delete_style(style_name='style_1', workspace='demo')
