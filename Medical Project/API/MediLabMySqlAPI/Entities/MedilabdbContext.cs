using System;
using System.Collections.Generic;
using MediLabMySqlAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MediLabMySqlAPI.Entities;

public class MedilabdbContext : DbContext
{
    public MedilabdbContext(DbContextOptions options) : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Distributor> Distributor { get; set; }

    public virtual DbSet<Product> Product { get; set; }

    public virtual DbSet<Login> Login { get; set; }

    public virtual DbSet<Orders> Orders { get; set; }

    public virtual DbSet<OrderDetails> OrderDetails { get; set; }

    public virtual DbSet<Sales> Sales { get; set; }

    public virtual DbSet<SalesDetails> SalesDetails { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OrderDetails>()
            .Property(b => b.id)
            .ValueGeneratedOnAdd();
        
    }
}
