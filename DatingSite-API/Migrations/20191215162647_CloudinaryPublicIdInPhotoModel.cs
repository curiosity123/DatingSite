using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingSite.API.Migrations
{
    public partial class CloudinaryPublicIdInPhotoModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CloudinaryId",
                table: "Photos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CloudinaryId",
                table: "Photos");
        }
    }
}
