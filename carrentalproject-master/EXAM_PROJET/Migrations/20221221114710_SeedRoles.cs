using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EXAM_PROJET.Migrations
{
    public partial class SeedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
               table: "AspNetRoles",
               columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
               values: new object[] { Guid.NewGuid().ToString(), "Locataire", "Locataire".ToUpper(), Guid.NewGuid().ToString() });
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
                values: new object[] { Guid.NewGuid().ToString(), "Admin", "Admin".ToUpper(), Guid.NewGuid().ToString() });
            migrationBuilder.InsertData(
               table: "AspNetRoles",
               columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
               values: new object[] { Guid.NewGuid().ToString(), "Proprietaire", "Proprietaire".ToUpper(), Guid.NewGuid().ToString() });
            migrationBuilder.InsertData(
               table: "AspNetRoles",
               columns: new[] { "Id", "Name", "NormalizedName", "ConcurrencyStamp" },
               values: new object[] { Guid.NewGuid().ToString(), "BlackListed", "BlackListed".ToUpper(), Guid.NewGuid().ToString() });

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Delete From [AspNetRoles]");

        }
    }
}
