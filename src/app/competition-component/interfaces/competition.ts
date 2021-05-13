export interface CompetitionResponse {
  count: number;
  filters: any;
  competitions: Competition[];
}
export interface Competition {
  id: number;
  area: any;
  name: string;
  code: string;
  plan: string;
  currentSeason: Season;
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: string;
}
