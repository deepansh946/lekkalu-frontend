import { Button, Slider, TextField } from "@mui/material";
import {
  isObjectEmpty,
  parseQueryString,
} from "components/EMI_Components/utils";
import { useUserPreferences } from "hooks/useUserPreferences";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { parseNumbers } from "utils/Number";

const DEFAULT_DATA = {
  initialVal: 5000,
  finalVal: 25000,
  durationInvestment: 5,
};

export default function CalculatorCAGR({ setSummary }) {
  const location = useLocation();
  const parsedObject = parseQueryString(location.search);
  const parsedNumbers = parseNumbers(parsedObject);
  const [values, setValues] = useState(
    !isObjectEmpty(parsedNumbers) ? parsedNumbers : DEFAULT_DATA
  );

  const [errors, setErrors] = useState(false);
  const { preferences } = useUserPreferences();

  const inputs = [
    {
      id: "initialVal",
      label: `Initial value (${preferences?.currencyUnit})`,
      type: "number",
      range: {
        min: 1000,
        max: 100_000_00,
      },
      step: 500,
    },
    {
      id: "finalVal",
      label: `Final Value Costs (${preferences?.currencyUnit})`,
      type: "number",
      range: {
        min: 1000,
        max: 100_000_00,
      },
      step: 500,
    },
    {
      id: "durationInvestment",
      label: "Duration of Investment (Years)",
      type: "number",
      range: {
        min: 1,
        max: 40,
      },
      step: 1,
    },
  ];

  const handleValueChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  const handleCalculate = useCallback(() => {
    const { initialVal, finalVal, durationInvestment } = values;
    if (!initialVal || !finalVal || !durationInvestment) {
      setErrors({
        initialVal: !initialVal,
        finalVal: !finalVal,
        durationInvestment: !durationInvestment,
      });
      return;
    }

    const calculatedCAGRSummary = getCAGR(
      initialVal,
      finalVal,
      durationInvestment
    );

    setSummary({ ...calculatedCAGRSummary, ...values });
    setErrors(false);
  }, [setSummary, values]);

  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div
      className="d-grid gap-4 w-100"
      style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
    >
      {inputs.map((input) => (
        <div>
          <TextField
            name={input.id}
            error={errors[input.id]}
            value={values[input.id]}
            onChange={handleValueChange}
            label={input.label}
            type={input.type}
            fullWidth
          />

          <Slider
            min={input.range.min}
            max={input.range.max}
            step={input.step}
            value={values[input.id]}
            name={input.id}
            onChange={handleValueChange}
          />
        </div>
      ))}
    </div>
  );
}

const minusChecker = (e, setState) => {
  const value = e.target.value;
  if (value.includes("-") || isNaN(value)) return;
  setState(value);
};

const getCAGR = (initialVal, finalVal, durationInvestment) => {
  const initialValNum = parseFloat(initialVal);
  const finalValNum = parseFloat(finalVal);
  const durationInvestmentNum = parseInt(durationInvestment);

  /** Calculating absolute CAGR and %age */
  const absoluteCAGR =
    Math.pow(finalValNum / initialValNum, 1 / durationInvestmentNum) - 1;
  const percentageCAGR = (absoluteCAGR * 100).toFixed(2);

  /** Calculating absolute returns */
  const absoluteReturns = (finalValNum / initialValNum - 1) * 100;

  /** Pie chart configuration */
  const pieChartData = [
    {
      name: "Initial Value",
      value: initialValNum,
    },
    {
      name: "Final Value",
      value: finalValNum,
    },
  ];

  /** Calculating amount based of CAGR for each year */
  let initialValue = initialValNum;
  const barChartData = [
    {
      name: "Year 0",
      value: initialValue,
    },
  ];

  for (let i = 1; i < durationInvestmentNum + 1; i++) {
    const amountThisYear = initialValue * (1 + absoluteCAGR);
    barChartData.push({
      name: `Year ${i}`,
      value: amountThisYear,
    });
    initialValue = amountThisYear;
  }

  return {
    absoluteCAGR: absoluteCAGR.toFixed(2),
    absoluteReturns: absoluteReturns.toFixed(2),
    percentageCAGR,
    durationInvestment: durationInvestmentNum,
    finalValNum,
    initialValNum,
    pieChartData,
    barChartData,
  };
};
