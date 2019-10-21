var app = new Vue({
  el: "#container",
  data: {
    month: "",
    calendarHead: "",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysOfMonth: [],
    year: 0
  },
  watch: {
    month(val) {
      this.daysOfMonth = this.setMonth(this.year, val);
      if (val === 13) {
        this.month = 1;
        this.year++;
      } else if (val === 0) {
        this.month = 12;
        this.year--;
      }
      this.calendarHead = `${this.year} оны ${this.month} сар`;
    }
  },
  created() {
    let date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  },
  methods: {
    setMonth(year, currentMonthWithNumber) {
      let days = new Date(year, currentMonthWithNumber, 0).getDate();
      let lastMonthDays = new Date(
        year,
        currentMonthWithNumber - 1,
        0
      ).getDate();
      let returnDays = [];
      let firstDayOfMonth = new Date(
        `${year}-${currentMonthWithNumber}-1`
      ).getDay();
      for (firstDayOfMonth; firstDayOfMonth > 0; firstDayOfMonth--) {
        returnDays.push(lastMonthDays - firstDayOfMonth + 1);
      }
      let i;
      for (i = 1; i <= days; i++) {
        returnDays.push(i);
      }
      i = 0;
      while (returnDays.length < 35) {
        returnDays.push(++i);
      }
      return returnDays;
    },
    isActive(day) {
      let date = new Date(),
        currentDay = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
      if (this.year === year && this.month === month && day === currentDay) {
        return "activeDay";
      }
    }
  }
});
