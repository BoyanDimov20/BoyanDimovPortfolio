using Data.DbModels;

namespace Data.Repository
{
    public interface IRepository
    {
        Task<ICollection<T>> GetAll<T>() where T : class, IEntity;
        Task<T> GetById<T>(string id) where T : class, IEntity;
        Task Add(IEntity entity);
        Task Update(IEntity entity);
        Task Delete(IEntity entity);

    }
}
