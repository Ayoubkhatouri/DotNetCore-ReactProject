using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EXAM_PROJET.Migrations
{
    public partial class DemandeFavoris : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Demande",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    locataireId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VoitureId = table.Column<int>(type: "int", nullable: false),
                    DateDebut = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateFin = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrixTotal = table.Column<double>(type: "float", nullable: false),
                    statut = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demande", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Demande_Voitures_VoitureId",
                        column: x => x.VoitureId,
                        principalTable: "Voitures",
                        principalColumn: "VoitureId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Demande_VoitureId",
                table: "Demande",
                column: "VoitureId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Demande");
        }
    }
}
