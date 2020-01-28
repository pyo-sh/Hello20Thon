import React, { useState, useCallback } from 'react';
import { Calendar, Select, Radio, Col, Row, Badge  } from 'antd';
import styled from 'styled-components';

const UpperDiv = styled.div`
    width: 400px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;
`;
const CalenderHeader = styled.div`
    padding: 10px;
    & .Title{
        margin-Bottom: 10px;
    }
`;

//
function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' }
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' }
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
        ];
        break;
      default:
    }
    return listData || [];
}
  
function dateCellRender(value) {
    // console.log(value.date(), value.month());
    const listData = getListData(value);
    return (
        listData.map(item => (
            <Badge status={item.type}/>
        ))
    );
  }
  
function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
}
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

//
const { Group, Button } = Radio;

const UserCalender = () => {
    const [nowDate, setNowDate] = useState(new Date());

    // onChange = 메뉴 판이 [내부 클릭에 의해] 바뀔 때 마다 저장
    const onCalenderChange = useCallback((value)=>{
        setNowDate(new Date(value.year(), value.month(), value.date()));
    }, []);

    // onPanelChange = 메뉴 판이 [헤더에 의해] 바뀔 때 마다 저장
    const onPanelChange = useCallback((value, mode) => {
        console.log(value.month(), mode);
    }, []);
    
    // 캘린더의 헤더를 Custom 해서 return
    const headerRender = ({ value, type, onChange, onTypeChange }) => {
        const date = value.date();                      // 선택한 시간의 date
        const month = value.month();                    // 선택한 시간의 month
        const year = value.year();                      // 선택한 시간의 year
        const localeData = value.localeData();          // 선택한 시간의 Data
        const months = [...localeData.monthsShort()];   // 가지고 있는 month 데이터 복사

        // Month의 Select Option 추가
        const monthOptions = [];
        for (let index = 0; index < 12; index++) {
            monthOptions.push(
                <Select.Option className="Month-Item" key={`${index}`}>
                    {months[index]}
                </Select.Option>
            );
        };

        // Year의 Select Option 추가
        const yearOptions = [];
        for (let i = year - 5; i < year + 5; i += 1) {
            yearOptions.push(
                <Select.Option key={i} value={i} className="Year-Item">
                    {i}
                </Select.Option>,
            );
        };

        return (
            <CalenderHeader>
                <div className="Title"> 운동 상태 </div>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Group onChange={e => onTypeChange(e.target.value)} value={type}>
                            <Button value="month">Month</Button>
                            <Button value="year">Year</Button>
                        </Group>
                    </Col>
                    <Col>
                        <Select
                            dropdownMatchSelectWidth={false}
                            className="Year"
                            onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                            }}
                            value={String(year)}
                        >
                            {yearOptions}
                        </Select>
                    </Col>
                    <Col>
                        <Select
                            dropdownMatchSelectWidth={false}
                            className="Month"
                            value={String(month)}
                            onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                            }}
                        >
                            {monthOptions}
                        </Select>
                    </Col>
                </Row>
            </CalenderHeader>
        );
    }

    return (
        <UpperDiv>
            <Calendar
                fullscreen={false}
                onChange={onCalenderChange}
                onPanelChange={onPanelChange}
                headerRender={headerRender}
                dateCellRender={dateCellRender}
                // monthCellRender={monthCellRender}
            />
        </UpperDiv>
    );
};

export default UserCalender;