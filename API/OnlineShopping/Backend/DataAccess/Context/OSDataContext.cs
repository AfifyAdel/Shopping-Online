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
            base.OnModelCreating(builder);            

            //Customer Can Make Orders
            builder.Entity<User>()
            .HasMany<Order>(s => s.Orders)
            .WithOne(g => g.Customer)
            .HasForeignKey(s => s.CustomerId).OnDelete(DeleteBehavior.Cascade);

            //Order have list of order detail
            builder.Entity<Order>()
            .HasMany<OrderDetail>(s => s.OrderDetails)
            .WithOne(g => g.Order)
            .HasForeignKey(s => s.OrderId).OnDelete(DeleteBehavior.Cascade);

            //Order Has one tax and discount
            builder.Entity<Order>()
            .HasOne<Tax>(s => s.Tax)
            .WithMany()
            .HasForeignKey(s => s.TaxId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Order>()
            .HasOne<Discount>(s => s.Discount)
            .WithMany()
            .HasForeignKey(s => s.DiscountId).OnDelete(DeleteBehavior.Cascade);

            //Items Has one tax and discount and uom
            builder.Entity<Item>()
            .HasOne<Tax>(s => s.Tax)
            .WithMany()
            .HasForeignKey(s => s.TaxId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Item>()
            .HasOne<Discount>(s => s.Discount)
            .WithMany()
            .HasForeignKey(s => s.DiscountId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Item>()
            .HasOne<UnitOfMeasure>(s => s.UnitOfMeasure)
            .WithMany()
            .HasForeignKey(s => s.UOM).OnDelete(DeleteBehavior.Cascade);

            //Customer Can Make Orders
            builder.Entity<User>()
            .HasMany<Order>(s => s.Orders)
            .WithOne(g => g.Customer)
            .HasForeignKey(s => s.CustomerId).OnDelete(DeleteBehavior.Cascade);

            //Add Roles
            builder.Entity<Role>().HasData(
                new Role{ Name = EUserRole.Admin.ToString(),NormalizedName = "ADMIN"},
                new Role { Name = EUserRole.Customer.ToString(), NormalizedName = "CUSTOMER" });
        }
    }
}
