using Domain.Constants.Enums;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Context
{
    public class OSDataContext : IdentityDbContext<User,Role,string>
    {
        public OSDataContext()
        {

        }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrdersDetails { get; set; }
        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            try
            {
                if (!builder.IsConfigured)
                {
                    builder.UseSqlServer("server=.\\SQLExpress;Database=ShoppingOnlineDB;Trusted_Connection=True;MultipleActiveResultSets=True");
                }
            }
            catch (Exception ex)
            {

            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);            

            //Customer Can Make Orders
            builder.Entity<User>()
            .HasMany<Order>(s => s.Orders)
            .WithOne(g => g.User)
            .HasForeignKey(s => s.CustomerId).OnDelete(DeleteBehavior.Cascade);

            //Order have list of order detail
            builder.Entity<Order>()
            .HasMany<OrderDetail>(s => s.OrderDetails)
            .WithOne(g => g.Order)
            .HasForeignKey(s => s.OrderId).OnDelete(DeleteBehavior.Cascade);


            //Add Roles
            builder.Entity<Role>().HasData(
                new Role{ Name = EUserRole.Admin.ToString(),NormalizedName = "ADMIN"},
                new Role { Name = EUserRole.Customer.ToString(), NormalizedName = "CUSTOMER" });
        }
    }
}
