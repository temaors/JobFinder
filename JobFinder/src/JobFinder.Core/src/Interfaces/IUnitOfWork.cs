namespace JobFinder.Core.Interfaces
{
    public interface IUnitOfWork
    {
        public Task<int> CompleteAsync();

        public void Dispose();
    }
}