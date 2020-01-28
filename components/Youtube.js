import React, { useState, useCallback } from "react";
import { Input, Form } from "antd";
const Youtube = () => {
  const [search, setSearch] = useState("");
  const onChangeSearch = useCallback((e)=> {
    setSearch(e.target.value);
  }, []);
  const onSubmitSearch = useCallback((e) => {
    e.preventDefault();
    // 검색
  }, [search]);
  return (
    <div>
      <Form onSubmit={onSubmitSearch}>
        <Input value={search} onChange={onChangeSearch} />
      </Form>
      { /* 검색해서 나오는거 추가해야함. */}
    </div>
  );
};

export default Youtube;
