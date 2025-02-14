import React, { useContext, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IncomePercentage from '../../assets/income-percentange.svg';
import IncomeTable from "./IncomeTable";
import { Context } from "provider/Provider";
import './index.css'

const IncomeStatementPage = () => {
  const { fetchIncomeStatement, incomeStatement } = useContext(Context);
  // Initialize variables to store the totals for each type
  let personalTotal = 0;
  let loanRepaymentTotal = 0;
  let investmentTotal = 0;

  // Iterate through the array of transactions
  incomeStatement.expenses.forEach(transaction => {
    // Check the type of the transaction and add its value to the corresponding total
    switch (transaction.type) {
        case "Personal":
            personalTotal += transaction.value;
            break;
        case "Loan_repayment":
            loanRepaymentTotal += transaction.value;
            break;
        case "Investment":
            investmentTotal += transaction.value;
            break;
        // You can add additional cases for other types if needed
    }
  });

  // Calculate the percentages
  const personalPercentage = (personalTotal / 179000) * 100;
  const loanRepaymentPercentage = (loanRepaymentTotal / 179000) * 100;
  const investmentPercentage = (investmentTotal / 179000) * 100;



  useEffect(() => {
    fetchIncomeStatement();
  }, []);

  return (
    <div style={{ backgroundColor: '#1976D2', paddingBottom: '30px'}}>
      <Container sx={{ paddingTop: '50px' }}>
        <Typography className='header-text' component="div" variant="h5" >
          Income statement
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 1, md: 3 }} style={{ marginBottom: '50px', marginTop: '0' }} >
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ display: "flex", '.css-4t2aqu-MuiPaper-root-MuiCard-root': { borderRadius: '12px' } }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto",paddingBottom:'16px !important  ' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:2 }}>
                    <img src={IncomePercentage} width={64} alt="" />
                    <div>
                      <Typography component="div" variant="h5" sx={{color: 'rgba(0, 0, 0, 0.75)', fontSize: '34px', fontWeight: 500, lineHeight: '40px'}} >
                        100%
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="sub-text"
                      >
                        Salary
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", borderRadius: '12px',flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto",paddingBottom:'16px !important  ' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:2 }}>
                    <img src={IncomePercentage} width={64} alt="" />
                    <div>
                      <Typography component="div" variant="h5" sx={{color: 'rgba(0, 0, 0, 0.75)', fontSize: '34px', fontWeight: 500, lineHeight: '40px'}}>
                        {personalPercentage.toFixed(2)}%
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="sub-text"
                      >
                        Personal
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Card sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", borderRadius: '12px',flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto",paddingBottom:'16px !important  ' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:2 }}>
                    <img src={IncomePercentage} width={64} alt="" />
                    <div>
                      <Typography component="div" variant="h5" sx={{color: 'rgba(0, 0, 0, 0.75)', fontSize: '34px', fontWeight: 500, lineHeight: '40px'}}>
                        {loanRepaymentPercentage.toFixed(2)}%
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="sub-text"
                      >
                        Loan_repayment
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <Card sx={{ display: "flex", }}>
              <Box sx={{ display: "flex", borderRadius: '12px',flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto",paddingBottom:'16px !important  ' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'center',gap:2 }}>
                    <img src={IncomePercentage} width={64} alt="" />
                    <div>
                      <Typography component="div" variant="h5" sx={{color: 'rgba(0, 0, 0, 0.75)', fontSize: '34px', fontWeight: 500, lineHeight: '40px'}}>
                        {investmentPercentage.toFixed(2)}%
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        className="sub-text"
                      >
                        Investment
                      </Typography>
                    </div>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <IncomeTable incomeStatement={incomeStatement} />
      </Container>
    </div>
  );
};

export default IncomeStatementPage;
