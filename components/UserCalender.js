import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNowPointingDate } from '../reducers/user';
import styled from 'styled-components';
import { Calendar, Select, Radio, Col, Row, Badge  } from 'antd';
const { Group, Button } = Radio;

const UpperDiv = styled.div`
    max-width: 340px;
    min-width: 260px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;
    margin: auto;
`;
const CalenderHeader = styled.div`
    padding: 10px;
    & .Title{
        margin-Bottom: 10px;
    }
`;

const UserCalender = () => {
    const dispatch = useDispatch();
    const [nowDate, setNowDate] = useState(new Date()); // 캘린더에서 표시하고 있는 State
    // onChange = 메뉴 판이 [내부 클릭에 의해] 바뀔 때 마다 저장
    const onCalenderChange = useCallback((value)=>{
        const dateTemp = new Date(value.year(), value.month(), value.date());
        const stringTemp = dateTemp.toString().slice(0, 15);
        setNowDate(stringTemp);

        console.log("클릭", stringTemp);
    }, [nowDate]);

    // onPanelChange = 메뉴 판이 [헤더에 의해] 바뀔 때 마다 저장
    const onPanelChange = useCallback((value, mode) => {
        console.log(value.month(), mode);
    }, [nowDate]);
    
    // 캘린더의 헤더를 Custom 해서 return
    const headerRender = ({ value, type, onChange, onTypeChange }) => {
        const date = value.date();                      // 선택한 시간의 date
        const month = value.month();                    // 선택한 시간의 month
        const year = value.year();                      // 선택한 시간의 year
        const localeData = value.localeData();          // 선택한 시간의 Data
        const months = [...localeData.monthsShort()];   // 가지고 있는 month 데이터 복사
         // 선택한 시간 redux에 저장
         const dateTemp = new Date(year, month, date);
         const stringTemp = dateTemp.toString().slice(0, 15);
         dispatch(setNowPointingDate(stringTemp));

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
    // Month 캘린더일 때 정보 표시(했는지 안했는지)를 전부 list로
    const getListData = (value) => {
        let listData = [{
            date: new Date(),
            type: 'warning',
        }];
        let resultData = [];
        if(listData[0].date.getFullYear() === value.year() && listData[0].date.getMonth() === value.month())
            if(listData[0].date.getDate() === value.date())
                resultData.push(listData[0]);
        return resultData || [];
    }
    // Month 캘린더일 때 정보 표시(했는지 안했는지)
    const dateCellRender = useCallback((value) => {
        // console.log(value.date(), value.month());
        const listData = getListData(value);
        return (
            listData.map(item => (
                <Badge status={item.type}/>
            ))
        );
    }, []);

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