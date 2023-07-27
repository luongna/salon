import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box } from '@mui/material';
import Header from '../../components/Header';
import viLocale from '@fullcalendar/core/locales/vi';
import { useEffect, useState } from 'react';
import axios from '~/utils/api/axios';
const Calendar = () => {
    const handleViewChange = (view) => {
        console.log(view);
    };
    const [branchData, setBranchData] = useState([]);
    useEffect(() => {
        axios
            .get(`/branch`)
            .then((res) => {
              setBranchData(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <Box m="20px">
            <Header title="Lịch" subtitle="Lịch làm việc đầy đủ" />
            <div>
                <label htmlFor="branch">Chọn chi nhánh</label>
                <select name="branch" id="branch" style={{ width: '200px' }}>
                <option  value='none'>Chọn chi nhánh</option>
                  {branchData.map((element, index) => (
                    <option key={index} value={element.id}>{element.name}</option>
                  ))}
                   
                </select>
            </div>
            <Box display="flex" justifyContent="space-between">
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        // dateClick={handleDateClick}
                        //  select={handleDateClick}
                        datesSet={handleViewChange}
                        // eventClick={handleEventClick}
                        locales={[viLocale]}
                        locale="vi"
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
                                id: '12316',
                                title: 'Event 1',
                                start: '2023-07-03T09:00:00',
                                end: '2023-07-03T10:00:00',
                            },
                            {
                                id: '12317',
                                title: 'Event 1',
                                start: '2023-08-01T09:00:00',
                                end: '2023-08-01T10:00:00',
                            },
                            {
                                id: '5124',
                                title: 'Event 2',
                                start: '2023-07-03T09:00:00',
                                end: '2023-07-03T10:00:00',
                            },
                            {
                                id: '5126',
                                title: 'Event 3',
                                start: '2023-07-03T09:00:00',
                                end: '2023-07-03T10:00:00',
                            },
                            {
                                id: '5126',
                                title: 'Event 3',
                                start: '2023-07-03T09:30:00',
                                end: '2023-07-03T10:30:00',
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
