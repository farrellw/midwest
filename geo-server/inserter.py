import psycopg2

import json


DB_HOST = "localhost"
DATABASE = "postgres"
DB_USER = "docker"
DB_PASSWORD = "docker"
DB_PORT = "25434"
TABLE = "states"

con = psycopg2.connect(
    database=DATABASE, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT,
)

with open('../src/data/us_states.json') as f:
    data = json.load(f)
    for feature in data["features"]:
        geom = (json.dumps(feature["geometry"]))
        p = feature["properties"]
        name = p["NAME"]
        state = p["STATE"]
        print("{} : {}".format(name, state))

        cur = con.cursor()
        cur.execute(
            """
            INSERT INTO states (name, id, geom)
            VALUES
            (
                '{}',
                '{}',
                ST_Multi(ST_GeomFromGeoJSON(
                    '{}'
                ))
            )
        """.format(name, state, geom))
        con.commit() # <- We MUST commit to reflect the inserted data
        cur.close()
con.close()
