
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
} from "@mui/material";
import Header from '../../components/Header';


const Calendar = () => {




  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            // select={handleDateClick}
            // eventClick={handleEventClick}
          
            initialEvents={[
              // {
              //   id: "12315",
              //   title: "All-day event",
              //   date: "2022-09-14",
              // },
              // {
              //   id: "5123",
              //   title: "Timed event",
              //   // date: "2023-07-03",
              //   start: "2023-07-03T09:00:00",
              //   end: "2023-07-03T12:00:00",
              // },
              {
                id: "12316",
                title: "Event 1",
                start: "2023-07-03T09:00:00",
                end: "2023-07-03T10:00:00",
              },
              {
                id: "5124",
                title: "Event 2",
                start: "2023-07-03T09:00:00",
                end: "2023-07-03T10:00:00",
              },
              {
                id: "5126",
                title: "Event 3",
                start: "2023-07-03T09:00:00",
                end: "2023-07-03T10:00:00",
              },
              {
                id: "5126",
                title: "Event 3",
                start: "2023-07-03T09:30:00",
                end: "2023-07-03T10:30:00",
              },
            ]}
          />
          
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
