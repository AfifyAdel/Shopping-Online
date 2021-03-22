using Domain.Constants.Enums;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Context
{
    public class OSDataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<OrderDetail> OrdersDetails { get; set; }
        public DbSet<UnitOfMeasure> UnitOfMeasures { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Tax> Taxes { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            try
            {
                if (!optionsBuilder.IsConfigured)
                {
                    optionsBuilder.UseSqlServer("server=.\\SQLExpress;Database=ShoppingOnlineDB;Trusted_Connection=True;MultipleActiveResultSets=True");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            //Add Roles
            modelBuilder.Entity<Role>().HasData(
                new Role{ Id=1, Name = EUserRole.Admin.ToString()},
                new Role { Id = 2, Name = EUserRole.Customer.ToString() });


            base.OnModelCreating(modelBuilder);
        }
    }
}
