namespace Crash.Misc
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger<RequestResponseLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            // Log the request details
            _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

            await _next(context);

            // Log the response details
            _logger.LogInformation($"Response: {context.Response.StatusCode}");
        }
    }
}
