using Data.DbModels;
using System.Linq.Expressions;

namespace Data.Repository
{
    public interface IRepository
    {
        IQueryable<T> GetAll<T>() where T : class, IEntity;
        IQueryable<T> GetById<T>(string id) where T : class, IEntity;
        Task Add(IEntity entity);
        Task Update(IEntity entity);
        Task Delete(IEntity entity);
        Task DeleteById<T>(string id) where T : class, IEntity, new();

        Task Delete<T>(Expression<Func<T, bool>> predicate) where T : class, IEntity;
    }
}
