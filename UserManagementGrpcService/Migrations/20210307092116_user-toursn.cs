using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UserManagementGrpcService.Migrations
{
    public partial class usertoursn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserTours",
                columns: table => new
                {
                    UserTourId = table.Column<string>(type: "text", nullable: false),
                    TourId = table.Column<string>(type: "text", nullable: false),
                    UserDetailId = table.Column<string>(type: "text", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Updated = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTours", x => x.UserTourId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTours");
        }
    }
}
