import * as moment from 'moment';

export class FilterStatsParams {
  module_id: number = 0
  state: number = 0;
  date_start: string =  moment().startOf('year').format('YYYY-MM-DD');
  date_end: string = moment().endOf('year').format('YYYY-MM-DD');
}