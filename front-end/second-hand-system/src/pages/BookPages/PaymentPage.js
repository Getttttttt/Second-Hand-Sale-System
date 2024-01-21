import * as React from 'react';
import { useParams } from 'react-router-dom'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'; 
import Box from '@mui/material/Box'; 
import Stepper from '@mui/material/Stepper'; 
import Step from '@mui/material/Step'; 
import StepLabel from '@mui/material/StepLabel';
const steps = [ '已支付', '已下单', '已发货', ];

export default function PaymentPage() {
    const { status } = useParams();
    const [isSuccess, setIsSuccess] = React.useState(false); 
    const [activeStep, setActiveStep] = React.useState(0);
    React.useEffect(() => {
        if (status === 'success') {
            setIsSuccess(true);
            const timer = setInterval(() => {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }, 2000);
            return () => clearInterval(timer);
        }
    }, [status]);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            {isSuccess ? (
                <>
                    <CheckCircleIcon style={{ color: 'green', fontSize: 80 }} />
                    <p style={{ textAlign: 'center' }}>支付成功</p>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </>
            ) : (
                <>
                    <SentimentVeryDissatisfiedIcon style={{ color: 'red', fontSize: 80 }} />
                    <p style={{ textAlign: 'center' }}>支付失败</p>
                </>
            )}
        </div>
    );
}