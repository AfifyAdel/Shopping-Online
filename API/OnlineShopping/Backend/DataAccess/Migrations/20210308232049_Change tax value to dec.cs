using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccess.Migrations
{
    public partial class Changetaxvaluetodec : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "71e5fdec-832f-4a66-8db5-8a7547077ce2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "959d17a1-d1c5-455c-b384-256bc8df6849");

            migrationBuilder.AlterColumn<decimal>(
                name: "Value",
                table: "Taxes",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "58b8df75-9281-4944-af88-745aa5054428", "1446c8e4-5fe2-43ab-af3c-c64edf94f4d2", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "9dda5926-8a9a-4789-8ad5-cb018dbadc27", "a3dd81ba-9f7c-449e-b6c9-5534daf9200e", "Customer", "CUSTOMER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "58b8df75-9281-4944-af88-745aa5054428");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9dda5926-8a9a-4789-8ad5-cb018dbadc27");

            migrationBuilder.AlterColumn<int>(
                name: "Value",
                table: "Taxes",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "959d17a1-d1c5-455c-b384-256bc8df6849", "9e789899-f8e6-4cf7-8345-314a19bb852f", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "71e5fdec-832f-4a66-8db5-8a7547077ce2", "b0bd74f2-e9e1-4f02-921f-3681fbc8ee3a", "Customer", "CUSTOMER" });
        }
    }
}
