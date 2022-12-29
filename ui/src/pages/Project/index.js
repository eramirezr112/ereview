import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { faker } from "@faker-js/faker";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Name",
    selector: (row) => row.id,
    sortable: true,
    cell: (row) => <Link to={`/example/${1}`}>{row.id}</Link>,
  },
  {
    name: "Owner",
    selector: (row) => row.owner,
    sortable: true,
  },
  {
    name: "Current iteration",
    selector: (row) => row.iteration,
    sortable: true,
  },
  {
    name: "Start date",
    selector: (row) => row.date,
    sortable: true,
  },
];

const createUser = () => ({
  id: faker.datatype.uuid(),
  owner: faker.name.fullName(),
  iteration: faker.datatype.number({
    max: 5,
    min: 1,
  }),
  date: faker.date.recent(10, "2020-01-01T00:00:00.000Z").toString(),
});

const createUsers = (numUsers = 5) =>
  new Array(numUsers).fill(undefined).map(createUser);

const fakeUsers = createUsers(2000);

const MyDataTable = styled(DataTable)``;
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const Project = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const filteredItems = fakeUsers.filter(
    (item) =>
      item.owner && item.owner.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <section className="projectPage">
      <MyDataTable
        title="Project Page"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
    </section>
  );
};

export default Project;
