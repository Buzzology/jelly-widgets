﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SubscriptionManagementGrpcService.Infrastructure;

namespace SubscriptionManagementGrpcService.Migrations.SubscriptionManagementDb
{
    [DbContext(typeof(SubscriptionManagementDbContext))]
    [Migration("20210201093953_subscriptions")]
    partial class subscriptions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("SubscriptionManagementData.Models.SiteCustomer", b =>
                {
                    b.Property<string>("SiteCustomerId")
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ExternalCustomerId")
                        .HasColumnType("text");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UserDetailId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SiteCustomerId");

                    b.ToTable("SiteCustomers");
                });

            modelBuilder.Entity("SubscriptionManagementData.Models.Subscription", b =>
                {
                    b.Property<string>("SubscriptionId")
                        .HasColumnType("text");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UserDetailId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("SubscriptionId");

                    b.ToTable("Subscriptions");
                });
#pragma warning restore 612, 618
        }
    }
}
