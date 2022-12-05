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

        public async Task<ICollection<T>> GetAll<T>() where T : class, IEntity
        {
            var entities = await this.dbContext.Set<T>().ToListAsync();

            return entities;
        }

        public async Task<T> GetById<T> (string id) where T : class, IEntity
        {
            var result = await this.dbContext.Set<T>().FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }

        public async Task Update(IEntity entity)
        {
            this.dbContext.Update(entity);

            await this.dbContext.SaveChangesAsync();
        }
    }
}
