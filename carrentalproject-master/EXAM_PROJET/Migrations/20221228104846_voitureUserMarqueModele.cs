using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EXAM_PROJET.Migrations
{
    public partial class voitureUserMarqueModele : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAgence",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Marques",
                columns: table => new
                {
                    MarqueId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomMarque = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Marques", x => x.MarqueId);
                });

            migrationBuilder.CreateTable(
                name: "Modeles",
                columns: table => new
                {
                    ModeleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomModel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MarqueId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Modeles", x => x.ModeleId);
                    table.ForeignKey(
                        name: "FK_Modeles_Marques_MarqueId",
                        column: x => x.MarqueId,
                        principalTable: "Marques",
                        principalColumn: "MarqueId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Voitures",
                columns: table => new
                {
                    VoitureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrixParJour = table.Column<double>(type: "float", nullable: false),
                    Annee = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kilometrage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MarqueId = table.Column<int>(type: "int", nullable: false),
                    ModeleId = table.Column<int>(type: "int", nullable: false),
                    Couleur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    Immatriculation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProprietaireId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EstDisponible = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voitures", x => x.VoitureId);
                    table.ForeignKey(
                        name: "FK_Voitures_AspNetUsers_ProprietaireId",
                        column: x => x.ProprietaireId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Voitures_Marques_MarqueId",
                        column: x => x.MarqueId,
                        principalTable: "Marques",
                        principalColumn: "MarqueId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Voitures_Modeles_ModeleId",
                        column: x => x.ModeleId,
                        principalTable: "Modeles",
                        principalColumn: "ModeleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Modeles_MarqueId",
                table: "Modeles",
                column: "MarqueId");

            migrationBuilder.CreateIndex(
                name: "IX_Voitures_MarqueId",
                table: "Voitures",
                column: "MarqueId");

            migrationBuilder.CreateIndex(
                name: "IX_Voitures_ModeleId",
                table: "Voitures",
                column: "ModeleId");

            migrationBuilder.CreateIndex(
                name: "IX_Voitures_ProprietaireId",
                table: "Voitures",
                column: "ProprietaireId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Voitures");

            migrationBuilder.DropTable(
                name: "Modeles");

            migrationBuilder.DropTable(
                name: "Marques");

            migrationBuilder.DropColumn(
                name: "isAgence",
                table: "AspNetUsers");
        }
    }
}
