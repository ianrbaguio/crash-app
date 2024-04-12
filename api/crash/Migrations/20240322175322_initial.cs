using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crash.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "accident",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AccidentId = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Latitude = table.Column<float>(type: "float", nullable: false),
                    Longitude = table.Column<float>(type: "float", nullable: false),
                    AccidentDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Weather = table.Column<string>(type: "text", nullable: false),
                    Daylight = table.Column<string>(type: "text", nullable: false),
                    EstimatedCost = table.Column<double>(type: "double precision", nullable: false),
                    NumberOfParties = table.Column<int>(type: "integer", nullable: false),
                    Parties = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accident", x => x.Id);
                });

           
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accidents");
            migrationBuilder.DropTable(
             name: "images");
        }
    }
}
