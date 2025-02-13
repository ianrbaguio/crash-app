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





INSERT INTO CrashUser
VALUES (gen_random_uuid(), 'ianb'), 
(gen_random_uuid(), 'piotr'),
(gen_random_uuid(), 'mariog'),
(gen_random_uuid(), 'mounikal'),
(gen_random_uuid(), 'vijit'),
(gen_random_uuid(), 'darrelb');


DROP TABLE IF EXISTS Accident;

CREATE TABLE IF NOT EXISTS public.accident
(
    "Id" uuid NOT NULL,
    "AccidentId" integer NOT NULL,
    "Location" text COLLATE pg_catalog."default" NOT NULL,
    "Latitude" double precision NOT NULL,
    "Longitude" double precision NOT NULL,
    "AccidentDate" timestamp with time zone NOT NULL,
    "Weather" text COLLATE pg_catalog."default" NOT NULL,
    "Daylight" text COLLATE pg_catalog."default" NOT NULL,
    "EstimatedCost" double precision NOT NULL,
    "NumberOfParties" integer NOT NULL,
    "Parties" text[] COLLATE pg_catalog."default",
    "Description" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_Accidents" PRIMARY KEY ("Id")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.accident
    OWNER to crash;

 

-- Table: public.party_details

DROP TABLE IF EXISTS public.party_details;

CREATE TABLE IF NOT EXISTS public.party_details
(
    "PartyId" bigint NOT NULL DEFAULT nextval('id_seq'::regclass),
    "License" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "Address" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "FirstName" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "LastName" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "AccidentId" uuid,
    "Phone" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "Remarks" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "InsuranceNumber" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "InsuranceProvider" text COLLATE pg_catalog."default" DEFAULT ''::text,
    CONSTRAINT parties_pkey PRIMARY KEY ("PartyId")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.party_details
    OWNER to crash;

-- Table: public.image

DROP TABLE IF EXISTS public.image;

CREATE TABLE IF NOT EXISTS public.image
(
    "Id" integer NOT NULL DEFAULT nextval('id_seq'::regclass),
    "AccidentId" uuid,
    "ImageData" bytea,
    CONSTRAINT images_pkey PRIMARY KEY ("Id")
)

TABLESPACE pg_default;
=======



ALTER TABLE IF EXISTS public.image
    OWNER to crash;