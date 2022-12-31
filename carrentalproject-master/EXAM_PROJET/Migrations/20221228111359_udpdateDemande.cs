using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EXAM_PROJET.Migrations
{
    public partial class udpdateDemande : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demande_Voitures_VoitureId",
                table: "Demande");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Demande",
                table: "Demande");

            migrationBuilder.RenameTable(
                name: "Demande",
                newName: "Demandes");

            migrationBuilder.RenameIndex(
                name: "IX_Demande_VoitureId",
                table: "Demandes",
                newName: "IX_Demandes_VoitureId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Demandes_Voitures_VoitureId",
                table: "Demandes",
                column: "VoitureId",
                principalTable: "Voitures",
                principalColumn: "VoitureId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Demandes_Voitures_VoitureId",
                table: "Demandes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Demandes",
                table: "Demandes");

            migrationBuilder.RenameTable(
                name: "Demandes",
                newName: "Demande");

            migrationBuilder.RenameIndex(
                name: "IX_Demandes_VoitureId",
                table: "Demande",
                newName: "IX_Demande_VoitureId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Demande",
                table: "Demande",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Demande_Voitures_VoitureId",
                table: "Demande",
                column: "VoitureId",
                principalTable: "Voitures",
                principalColumn: "VoitureId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
