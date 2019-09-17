// Tuesday:   https://www.denverstartupweek.org/schedule/6066-startup-crawl-night-1
// Thursday:  https://www.denverstartupweek.org/schedule/6067-startup-crawl-night-2

const EVENTS = [
  {startTime: 'Sep 17, 2019 15:00:00', endTime: 'Sep 17, 2019 19:00:00'},
  {startTime: 'Sep 19, 2019 16:00:00', endTime: 'Sep 19, 2019 19:00:00'},
];

interface StumblEvent {
  startTime: string;
  endTime: string;
}

class EventService {
  public getNextEvent(index: number): StumblEvent | undefined {
    if (index === null || index === undefined) {
      index = 0;
    }

    return EVENTS[index];
  }

  /**
   * If any event is active
   * Used to start the polling so user's can't checkin early
   */
  public stumblin() {
    const now = new Date();
    const dayOneStart = new Date(EVENTS[0].startTime);
    const dayOneEnd = new Date(EVENTS[0].endTime);
    const dayTwoStart = new Date(EVENTS[1].startTime);
    const dayTwoEnd = new Date(EVENTS[1].endTime);

    if ((now >= dayOneStart && now <= dayOneEnd) || (now >= dayTwoStart && now <= dayTwoEnd)) {
      return true;
    } else {
      return false;
    }
  }
}

export default new EventService();
