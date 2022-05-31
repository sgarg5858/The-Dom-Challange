let nonConficting = 
    [
        {
          startTime: "00:00",
          endTime: "01:30",
          color: "#f6be23",
          title: "#TeamDevkode",
        },
        {
          startTime: "4:30",
          endTime: "7:30",
          color: "#f6501e",
          title: "#TeamDevkode",
        },
        {
          startTime: "12:00",
          endTime: "13:30",
          color: "#029be5",
          title: "#TeamDevkode",
        },
        {
          startTime: "9:00",
          endTime: "10:00",
          color: "#029be5",
          title: "#TeamDevkode",
        },
        {
          startTime: "16:00",
          endTime: "19:00",
          color: "#029be5",
          title: "#TeamDevkode",
        },
        {
          startTime: "20:30",
          endTime: "22:30",
          color: "#029be5",
          title: "#TeamDevkode",
        },
      ];
let conficting = [
    {
      startTime: "00:00",
      endTime: "01:30",
      color: "#f6be23",
      title: "#TeamDevkode",
    },
    {
      startTime: "3:30",
      endTime: "7:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "4:30",
      endTime: "8:30",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "6:30",
      endTime: "9:00",
      color: "#f6501e",
      title: "Demo",
    },
    {
      startTime: "11:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "12:00",
      endTime: "13:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "9:30",
      endTime: "10:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "16:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "15:00",
      endTime: "17:00",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "18:00",
      endTime: "19:00",
      color: "#f6501e",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
    {
      startTime: "20:30",
      endTime: "22:30",
      color: "#029be5",
      title: "#TeamDevkode",
    },
  ]

function CreateDayCalendar(el,schedule)
{
    let calendarElement = document.getElementById(el);
    let documentFragment = new DocumentFragment();
    for(let i=0;i<24;i++)
    {
        let hourCell = document.createElement('div');
        hourCell.classList.add('hour');

        let timeCell = document.createElement('div');
        timeCell.classList.add('time');

        let eventCell = document.createElement('div');
        eventCell.classList.add('event');

        let time = `${getTwelveHourZoneValue(i)} ${isPm(i) ? 'PM' : 'AM'}`
        timeCell.innerHTML = time ;

        hourCell.append(timeCell,eventCell);

        documentFragment.append(hourCell)
    }
    calendarElement.append(documentFragment);

    function isPm(n)
    {
        return n>=12;
    }
    function getTwelveHourZoneValue(m)
    {
        return m<=12 ? m :m-12;
    }

    function calculateStartPositonAndSize(starttime,endtime){
        let startSplit = starttime.split(":");
        let endSplit = endtime.split(":");
        let startposition = Math.round(Number(startSplit[0])*100 +  (Number(startSplit[1])/60) * 100);
        let endposition = Math.round(Number(endSplit[0])*100 +  (Number(endSplit[1])/60) * 100);
        return [startposition,endposition-startposition];
    }
    function getStartAndEndTimeInFormat(starttime,endtime){
        let startSplit = starttime.split(":");
        let endSplit = endtime.split(":");
        let start =  `${getTwelveHourZoneValue(Number(startSplit[0]))}:${startSplit[1]} ${isPm(Number(startSplit[0]))? 'PM' :'AM'}`;
        let end = `${getTwelveHourZoneValue(Number(endSplit[0]))}:${endSplit[1]} ${isPm(Number(endSplit[0]))? 'PM' :'AM'}`;
        return [start,end];

    }


    let events=[]

    for(let i=0;i<schedule.length;i++)
    {
        
        let [startposition,height]=calculateStartPositonAndSize(schedule[i].startTime,schedule[i].endTime);
        let calendarEvent = document.createElement('div');
        calendarEvent.classList.add('myevent1');
        calendarEvent.dataset.start=startposition;
        calendarEvent.dataset.end=height+startposition;
        calendarEvent.style.top=`${startposition}px`;
        calendarEvent.style.height=`${height}px`;
        calendarEvent.style.backgroundColor=schedule[i].color;
        calendarEvent.style.zIndex=1;
        calendarEvent.style.width='100%';
        calendarEvent.style.border="2px solid white"
        
        calendarEvent.innerHTML = `<h4> ${schedule[i].title} </h4> `
        let times =getStartAndEndTimeInFormat(schedule[i].startTime,schedule[i].endTime);
        calendarEvent.innerHTML +=  ` <h5> ${times[0]} - ${times[1]} </h5>`;
        
        events.push(calendarEvent);

       
    }
     events = events.sort((a,b)=>{
          if( Number( a.dataset.start) > Number(b.dataset.start) )
          {
              return 1;
          }
          else if( Number( a.dataset.start) < Number(b.dataset.start) )
          {
              return -1;
          }
          return 0;
        })
    // events.forEach((event)=>{
    //     console.log(event.dataset)
    // });
    let start = events[0].dataset.start ,end = events[0].dataset.end;
    let count=1; // for z-index & width for clashing
    for(let i=1;i<events.length;i++)
    {
        let currStart =  events[i].dataset.start;
        let currEnd = events[i].dataset.end;

        if(currStart >= start && currStart <=end)
        {
            console.log(events[i].dataset,i);
            start = Math.min(start,currStart);
            end=Math.max(end,currEnd);
            count++;

            events[i].style.zIndex=count+1;
            let width = 100/count;
            console.log(width);
            events[i].style.width=`${width}%`;
            events[i].style.marginLeft=`${100-width}%`;
            console.log(start,end);
        }
        else
        {
            start=events[i].dataset.start;
            end=events[i].dataset.end;
            count=1;
        }
    }
    // console.log(events.length);
    // for(let i=0;i<events.length;i++)
    // {
    //     console.log(events[i].style.zIndex,events[i].style.width)
    // }

    calendarElement.append(...events);
} 

CreateDayCalendar("calendar",conficting);