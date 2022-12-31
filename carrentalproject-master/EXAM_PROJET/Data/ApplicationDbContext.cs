using EXAM_PROJET.Models;
using EXAM_PROJET.Models.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EXAM_PROJET.Data
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser>
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            /*  modelBuilder.Entity<Demande>()
                  .HasKey(e => new { e.VoitureId, e.Id });
              modelBuilder.Entity<Demande>()
                  .HasOne(b => b.Voiture)
                  .WithMany(c => c.Demandes)
                  .HasForeignKey(e => e.VoitureId);

              modelBuilder.Entity<Demande>()
                  .HasOne(b => b.ApplicationUser)
                  .WithMany(c => c.Demandes)
                  .HasForeignKey(e => e.Id);*/


        }
        public DbSet<Voiture> Voitures { get; set; }
         
        public DbSet<Marque> Marques { get; set; }
        public DbSet<Modele> Modeles { get; set; }
        public DbSet<Favori> Favoris { get; set; }
        public DbSet<Demande> Demandes { get; set; } 
        public DbSet<Offre> Offres { get; set; }
    }
}
