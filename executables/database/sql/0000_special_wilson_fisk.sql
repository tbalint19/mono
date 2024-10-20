CREATE TABLE IF NOT EXISTS "APP_USER" (
	"OPEN_ID" text,
	"USERNAME" text,
	"EMAIL" text,
	"DATA" json,
	"ID" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"CREATED_AT" timestamp DEFAULT now(),
	"UPDATED_AT" timestamp DEFAULT now(),
	CONSTRAINT "APP_USER_OPEN_ID_unique" UNIQUE("OPEN_ID")
);
