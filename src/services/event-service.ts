// Tuesday:   https://www.denverstartupweek.org/schedule/6066-startup-crawl-night-1
// Thursday:  https://www.denverstartupweek.org/schedule/6067-startup-crawl-night-2

const EVENTS = [
  {startTime: 'Sep 17, 2019 16:00:00', endTime: 'Sep 17, 2019 17:00:00'},
  {startTime: 'Sep 19, 2019 16:00:00', endTime: 'Sep 19, 2019 17:00:00'},
];

interface StumblEvent {
  startTime: string;
  endTime: string;
}

export default class EventService {
  public static getNextEvent(index: number): StumblEvent | undefined {
    if (index === null || index === undefined) {
      index = 0;
    }

    return EVENTS[index];
  }
}
