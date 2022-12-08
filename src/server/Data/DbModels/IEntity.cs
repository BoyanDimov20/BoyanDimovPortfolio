namespace Data.DbModels
{
    public interface IEntity
    {
        public string Id { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
