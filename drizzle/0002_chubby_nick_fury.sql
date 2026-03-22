CREATE TYPE "public"."userRole" AS ENUM('ADMIN', 'GUEST');--> statement-breakpoint
CREATE TABLE "user_test" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"userRole" "userRole" DEFAULT 'GUEST' NOT NULL,
	CONSTRAINT "user_test_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "userRole" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "userRole" SET DATA TYPE "public"."userRole" USING "userRole"::text::"public"."userRole";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "userRole" SET DEFAULT 'GUEST';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "age" integer NOT NULL;--> statement-breakpoint
CREATE INDEX "emailIndex" ON "user" USING btree ("email");--> statement-breakpoint
ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_unique" UNIQUE("userId");--> statement-breakpoint
DROP TYPE "public"."userROle";