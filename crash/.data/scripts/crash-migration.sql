-- Sequence for auto-incrementing IDs (used by party_details and image)
CREATE SEQUENCE IF NOT EXISTS public.id_seq;

-- Table: public.CrashUser (Added missing table definition)
-- DROP TABLE IF EXISTS public.CrashUser; -- Optional: Uncomment if you need to fully reset this table
CREATE TABLE IF NOT EXISTS public.CrashUser
(
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "Username" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_CrashUser" PRIMARY KEY ("Id"),
    CONSTRAINT "UQ_CrashUser_Username" UNIQUE ("Username") -- Assuming usernames should be unique
);

-- Table: public.accident
DROP TABLE IF EXISTS public.accident; -- Using DROP TABLE before CREATE ensures a clean slate if structure changes
CREATE TABLE IF NOT EXISTS public.accident
(
    "Id" uuid NOT NULL DEFAULT gen_random_uuid(), -- Added default UUID generation like CrashUser
    "AccidentId" integer NOT NULL, -- Consider if this is still needed if "Id" is the primary UUID key
    "Location" text COLLATE pg_catalog."default" NOT NULL,
    "Latitude" double precision NOT NULL,
    "Longitude" double precision NOT NULL,
    "AccidentDate" timestamp with time zone NOT NULL,
    "Weather" text COLLATE pg_catalog."default" NOT NULL,
    "Daylight" text COLLATE pg_catalog."default" NOT NULL,
    "EstimatedCost" double precision NOT NULL,
    "NumberOfParties" integer NOT NULL,
    "Parties" text[] COLLATE pg_catalog."default", -- Array of party identifiers? Clarify usage.
    "Description" text COLLATE pg_catalog."default",
    CONSTRAINT "PK_Accidents" PRIMARY KEY ("Id")
);

-- Table: public.party_details
DROP TABLE IF EXISTS public.party_details;
CREATE TABLE IF NOT EXISTS public.party_details
(
    "PartyId" bigint NOT NULL DEFAULT nextval('id_seq'::regclass), -- Using the sequence
    "License" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "Address" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "FirstName" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "LastName" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "AccidentId" uuid, -- Foreign key relationship to accident."Id"? Consider adding FK constraint.
    "Phone" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "Remarks" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "InsuranceNumber" text COLLATE pg_catalog."default" DEFAULT ''::text,
    "InsuranceProvider" text COLLATE pg_catalog."default" DEFAULT ''::text,
    CONSTRAINT parties_pkey PRIMARY KEY ("PartyId")
    -- Optional: Add foreign key constraint
    -- , CONSTRAINT "FK_PartyDetails_Accident" FOREIGN KEY ("AccidentId") REFERENCES public.accident ("Id") ON DELETE CASCADE
);

-- Table: public.image
DROP TABLE IF EXISTS public.image;
CREATE TABLE IF NOT EXISTS public.image
(
    "Id" integer NOT NULL DEFAULT nextval('id_seq'::regclass), -- Using the sequence
    "AccidentId" uuid, -- Foreign key relationship to accident."Id"? Consider adding FK constraint.
    "ImageData" bytea,
    CONSTRAINT images_pkey PRIMARY KEY ("Id")
     -- Optional: Add foreign key constraint
    -- , CONSTRAINT "FK_Image_Accident" FOREIGN KEY ("AccidentId") REFERENCES public.accident ("Id") ON DELETE CASCADE
);


-- Insert initial users *after* CrashUser table is created
INSERT INTO public.CrashUser ("Username") -- Specify column for clarity
VALUES
('ianb'),
('piotr'),
('mariog'),
('mounikal'),
('vijit'),
('darrelb')
ON CONFLICT ("Username") DO NOTHING; -- Prevents errors if script is run multiple times

-- Grant necessary permissions to the user the application will connect as (if not postgres)
-- Example: GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO my_app_user;
-- Example: GRANT USAGE, SELECT ON SEQUENCE public.id_seq TO my_app_user;

-- Note: Removed all "ALTER TABLE ... OWNER to crash;" lines.
-- The tables will be owned by the user executing this script (likely 'postgres').