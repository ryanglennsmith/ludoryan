export default interface ILogger {
  event: string;
  successMessage?: string;
  errorMessage?: string;
  userId?: string;
}
