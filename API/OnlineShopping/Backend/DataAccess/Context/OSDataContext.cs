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
    public class OSDataContext : DbContext
    {
        public OSDataContext()
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrdersDetails { get; set; }
        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Tax> Taxes { get; set; }
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
            
            //Add Roles
            builder.Entity<Role>().HasData(
                new Role{ Name = EUserRole.Admin.ToString(),NormalizedName = "ADMIN"},
                new Role { Name = EUserRole.Customer.ToString(), NormalizedName = "CUSTOMER" });


            base.OnModelCreating(builder);
        }
    }
}
