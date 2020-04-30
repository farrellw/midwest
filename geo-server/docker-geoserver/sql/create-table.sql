-- Drop table
-- DROP TABLE public.states;
CREATE TABLE public.statestest (
	name varchar NOT NULL,
	id varchar NOT NULL,
	geom geometry(MULTIPOLYGON, 4326) NULL
);