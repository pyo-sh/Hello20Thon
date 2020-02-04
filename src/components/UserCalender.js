import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNowPointingDate } from '../reducers/day';
import styled from 'styled-components';
import { Calendar, Select, Radio, Col, Row, Badge  } from 'antd';
const { Group, Button } = Radio;

const UpperDiv = styled.div`
    width: 340px;
    border: 1px solid #d9d9d9;
    border-Radius: 4px;
    margin: 20px;
    & .ant-fullcalendar-selected-day .ant-fullcalendar-value, .ant-fullcalendar-month-panel-selected-cell .ant-fullcalendar-value{
        color: black;
        border-radius: none;
        border-bottom: 2px solid #8854d0;
        background: none;
        box-shadow: none;
    }
    & .ant-fullcalendar-today .ant-fullcalendar-value, .ant-fullcalendar-month-panel-current-cell .ant-fullcalendar-value{
        box-shadow: none;
        color: rgba(0, 0, 0, 0.65);
        background: #d980fa73;
    }
    & .ant-fullcalendar-value{
        & :hover, :focus{
            background: #d980fa20;
        }
        & :active{
            background: #d980fa;
        }
    }
    & .ant-fullcalendar-content{
        justify-content: center;
        & .ant-badge{
            width: 8px;
        }
    }
`;
const CalendarHeader = styled.div`
    padding: 10px;
    & .Title{
        margin-Bottom: 10px;
        font-size: 25px;
        /* border-bottom: 1px solid #d9d9d9; */
        text-align: center;
    }
    & .Calendar-Button{
        border: none;
        box-shadow: none;
        margin: 1px;
    }
    & .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
        color: #8854d0;
        border: none;
        border-radius: none;
        border-bottom: 2px solid #8854d0;
        box-shadow: none;
    }
    & .ant-radio-button-wrapper:hover{
        color: #8854d0;
        background: #d980fa20;
        box-shadow: 0 0 0 1px #d980fa20;
    }
    & .ant-select-selection{
        & :hover, :active, :focus{
            border-color: #d980fa99;
            box-shadow: 0 0 0 2px #d980fa30;
        }
    }
    & .Year-Item{
        & :hover, :focus{
            background: #d980fa20;
        }
    }
`;

const UserCalender = () => {
    const dispatch = useDispatch();
    const [nowDate, setNowDate] = useState(new Date());         // 캘린더에서 표시하고 있는 State
    const routine = useSelector(state => state.day.routine);    // 가지고 있는 routine
    const memo = useSelector(state => state.day.memo);          // 가지고 있는 memo

    // onChange = 메뉴 판이 [내부 클릭에 의해] 바뀔 때 마다 저장
    const onCalenderChange = useCallback((value)=>{
        const dateTemp = new Date(value.year(), value.month(), value.date());
        const stringTemp = dateTemp.toString().slice(0, 15);
        setNowDate(stringTemp);
    }, [nowDate]);

    // onPanelChange = 메뉴 판이 [헤더에 의해] 바뀔 때 마다 저장
    // const onPanelChange = useCallback((value, mode) => {
    //     console.log(value.month(), mode);
    // }, [nowDate]);
    
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
        const monthOptions = Array(12).fill(0).map((v, index) => (
            <Select.Option className="Month-Item" key={`${index}`}>
                {months[index]}
            </Select.Option>
        )); 

        // Year의 Select Option 추가
        const yearOptions = Array(11).fill(0).map((v, index) => (
            <Select.Option key={index} value={year-5+index} className="Year-Item">
                {year-5+index}
            </Select.Option>
        ));

        return (
            <CalendarHeader>
                <div className="Title"> Calender </div>
                <Row type="flex" justify="space-between">
                    <Col>
                        <Group onChange={e => onTypeChange(e.target.value)} value={type}>
                            <Button className="Calendar-Button" value="month">Month</Button>
                            <Button className="Calendar-Button" value="year">Year</Button>
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
            </CalendarHeader>
        );
    }
    // Month 캘린더일 때 정보 표시(했는지 안했는지)를 전부 list로
    const getListData = (value) => {
        const dateValue = value.toString().slice(0, 15);
        let resultData = [];
        // 루틴에 해당하는 value가 있다면?
        if(routine[dateValue]){
            let isDone = true;  // done이 전부 다 됐는지 확인하는 bool
            // routine들의 리스트를 map
            routine[dateValue].map((routines)=>{
                // trainings가 비어있지 않다면?
                if(routines.trainings && routines.trainings.length !== 0){
                    // trainings의 배열을 확인해서
                    routines.trainings.map((element)=>{
                    // 작업을 전 부 완료했는지 본다.
                    isDone = isDone && element.done;
                    });
                }
                // trainings가 비어있다면 아니다.
                else isDone = false;
            });
            resultData.push({
                date: value,
                type: isDone ? 'success' : 'warning'
            })
        }
        if(memo[dateValue]){
            resultData.push({
                date: value,
                type: 'processing',
            });
        }
        return resultData || [];
    }
    // Month 캘린더일 때 정보 표시(했는지 안했는지)
    const dateCellRender = useCallback((value) => {
        // console.log(value.date(), value.month());
        const listData = getListData(value);
        return (
            listData.map((item, index) => (
                <Badge status={item.type} key={index}/>
            ))
        );
    }, [memo, routine]);

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
                // onPanelChange={onPanelChange}
                headerRender={headerRender}
                dateCellRender={dateCellRender}
                // monthCellRender={monthCellRender}
            />
        </UpperDiv>
    );
};

export default UserCalender;