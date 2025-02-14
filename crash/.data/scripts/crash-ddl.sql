ALTER TABLE party_details
    ADD COLUMN    "InsuranceNumber" text COLLATE pg_catalog."default" DEFAULT ''::text,
    ADD COLUMN "InsuranceProvider" text COLLATE pg_catalog."default" DEFAULT ''::text 
	
	
ALTER TABLE accident
    ADD COLUMN "EventData" text COLLATE pg_catalog."default" DEFAULT ''::text,
    ADD COLUMN "Description" text COLLATE pg_catalog."default" DEFAULT ''::text 