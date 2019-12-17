import * as React from "react";
import { useState } from "react";
import * as schoolExpenses from "../data/SchoolExpenses.json";
import { IGeneralSchoolExpense } from "../models/Data";
import { rows } from "../models/GeneralExpenseConstants";
import GeneralExpense from "./GeneralExpense";
import CategoryExpense from "./CategoryExpense";
import {
  subCategoryExpenseData,
  subCategoryTableData
} from "../models/FakeSubCategory";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Body() {
  const [toggle, setToggle] = useState("Total");
  const [compareWithAverage, setCompareWthAverage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const query = useQuery();

  const selectedIds: string[] = query.getAll("id");

  const selectedSchools: IGeneralSchoolExpense[] = schoolExpenses
    .filter(school => {
      return selectedIds.includes(school.id);
    })
    .map(school => {
      if (toggle !== "Total") {
        const averagedSchool = {
          ...school,
          administrativeSalaries:
            school.administrativeSalaries / school.projectedEnrollment,
          instructionalSalaries:
            school.instructionalSalaries / school.projectedEnrollment,
          instructionalSupportSalaries:
            school.instructionalSupportSalaries / school.projectedEnrollment,
          nonInstructionalSupportSalaries:
            school.nonInstructionalSupportSalaries / school.projectedEnrollment,
          temp: school.temp / school.projectedEnrollment,
          benefits: school.benefits / school.projectedEnrollment,
          transportation: school.transportation / school.projectedEnrollment,
          discretionary: school.discretionary / school.projectedEnrollment
        };
        return averagedSchool;
      } else {
        return school;
      }
    });

  const handleChange = () => {
    if (toggle === "Total") {
      setToggle("Per Student");
    } else {
      setToggle("Total");
    }
  };

  const handleCompareWithAverageChange = () => {
    setCompareWthAverage(!compareWithAverage);
  }

  const clickEvent = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ): void => {
    setSelectedCategory(event.currentTarget.id);
  };

  return (
    <section className="body">
      <div className="displayOptions">
        <label>
          <span>Total</span>
          <Switch
            onChange={handleChange}
            checked={toggle === "Per Student"}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor={"#34baeb"}
            onColor={"#a2eb34"}
          />
          <span>Per Student</span>
        </label>
        <label>
          <Switch
            onChange={handleCompareWithAverageChange}
            checked={compareWithAverage}
          />
          <span>Compare Against Average</span>
        </label>
      </div>
      <GeneralExpense
        selectedSchools={selectedSchools}
        headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
        rows={rows}
        caption={`General Expenses ( ${toggle} )`}
        clickHandler={clickEvent}
        toggle={toggle}
        category={selectedCategory}
      />
      {selectedCategory && selectedCategory !== "" && (
        <CategoryExpense
          selectedSchools={selectedIds.map(n => subCategoryExpenseData)}
          headers={["Field Name"].concat(selectedSchools.map(n => n.name))}
          rows={subCategoryTableData}
          caption={`${selectedCategory} ( ${toggle} )`}
        />
      )}
    </section>
  );
}

export default Body;
