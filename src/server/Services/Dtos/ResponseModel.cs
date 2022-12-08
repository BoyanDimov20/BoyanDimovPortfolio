namespace Services.Dtos
{
    public class ResponseModel<T>
    {
        public ResponseModel(T result)
        {
            Result = result;
            IsSuccess = true;
        }
        public ResponseModel(string errorMessage)
        {
            ErrorMessage = errorMessage;
            IsSuccess = false;
        }
        public T Result { get; set; }
        public bool IsSuccess { get; set; }

        public string? ErrorMessage { get; set; }
    }
}
