const SCHEDULE_KPI_URL = 'https://schedule.kpi.ua';

export function getGroupScheduleUrl(scheduleId: string): string {
  return `${SCHEDULE_KPI_URL}?groupId=${scheduleId}`;
}

export function getLecturerScheduleUrl(scheduleId: string): string {
  return `${SCHEDULE_KPI_URL}/lecturers?lecturerId=${scheduleId}`;
}
