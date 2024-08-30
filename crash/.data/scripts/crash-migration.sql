-- DROP TABLE IF EXISTS public.accident;
CREATE TABLE IF NOT EXISTS public.accident
(
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "AccidentId" integer NOT NULL,
    "Location" text COLLATE pg_catalog."default" NOT NULL,
    "Latitude" double precision NOT NULL,
    "Longitude" double precision NOT NULL,
    "AccidentDate" timestamp with time zone NOT NULL,
    "Weather" text COLLATE pg_catalog."default" NOT NULL,
    "Daylight" text COLLATE pg_catalog."default" NOT NULL,
    "EstimatedCost" double precision NOT NULL,
    "NumberOfParties" integer NOT NULL,
    "Parties" text[] COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_Accidents" PRIMARY KEY ("Id")
);

-- DROP TABLE IF EXISTS public.image;
CREATE TABLE IF NOT EXISTS public.image
(
    "Id" integer NOT NULL DEFAULT nextval('id_seq'::regclass),
    "AccidentId" uuid,
    "ImageData" bytea,
    CONSTRAINT images_pkey PRIMARY KEY ("Id")
);



CREATE TABLE IF NOT EXISTS party_details
(
	party_detail_id UUID NOT NULL DEFAULT gen_random_uuid(),
	accident_id UUID NOT NULL,
	license_number VARCHAR(50),
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	address VARCHAR(50)
)

INSERT INTO CrashUser
VALUES (gen_random_uuid(), 'ianb'), 
(gen_random_uuid(), 'piotr'),
(gen_random_uuid(), 'mariog'),
(gen_random_uuid(), 'mounikal'),
(gen_random_uuid(), 'vijit'),
(gen_random_uuid(), 'darrelb');



