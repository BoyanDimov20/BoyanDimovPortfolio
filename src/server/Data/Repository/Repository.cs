using Data.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Data.Repository
{
    public class Repository : IRepository
    {
        private readonly ApplicationDbContext dbContext;

        public Repository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task Add(IEntity entity)
        {
            await this.dbContext.AddAsync(entity);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task Delete(IEntity entity)
        {
            this.dbContext.Remove(entity);
            await this.dbContext.SaveChangesAsync();
        }

        public IQueryable<T> GetAll<T>() where T : class, IEntity
        {
            return this.dbContext.Set<T>().AsQueryable<T>();
        }

        public IQueryable<T> GetById<T> (string id) where T : class, IEntity
        {
            return this.dbContext.Set<T>().Take(1);
        }

        public async Task Update(IEntity entity)
        {
            this.dbContext.Update(entity);

            await this.dbContext.SaveChangesAsync();
        }
    }
}
