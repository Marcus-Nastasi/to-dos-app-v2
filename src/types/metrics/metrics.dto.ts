export interface MetricsResponseDto {
   total: number,
   high: number,
   medium: number,
   low: number,
   pending: number,
   in_progress: number,
   done: number,
   overdue: number,
   future: number,
   completion_rate: number
}
