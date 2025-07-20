namespace JobFinder.Core.Interfaces
{
    public interface IRepository<TEntity> : IDisposable
        where TEntity : class
    {
        // IQueryable<TEntity> GetAll();
        // Task<TEntity?> FindBy(Func<TEntity, bool> entity);
        // Task<TEntity> GetById(int id);
        // Task<TEntity> Create(TEntity entity);
        // TEntity Update(TEntity entity);
        // Task Save();
        // Task Delete(int id);
    }
}