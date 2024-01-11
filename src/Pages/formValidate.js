
const ValidateForm = (form) => {
    const {name, number, month, year, cvv} = form;
    const regexNum = /^[0-9\b]+$/;
    const regexMon = /^(1[0-2]|[1-9])$/;
    const err = {};

    if(!name || name === ''){
      err.name = "Please enter your name";
    }
    if(!number || number === ''){
      err.number = "Please enter your Card Number";
    } else if (!regexNum.test(number)){
      err.number = "enter valid number";
    }
    if(!month || month === ''){
      err.month = "Please enter Month of expiry";
    } else if(!regexMon.test(month)){
        err.month = "Enter valid month"
    }
    if(!year || year === ''){
      err.year = "Please enter Year of expiry";
    } else if(year.length !== 4 ) {
      err.year = " please enter valid year";
    }
    if(!cvv || cvv === ''){
      err.cvv = "Please enter your cvv";
    }  else if (cvv.length > 3) {
      err.cvv = "Please enter valid cvv"
    }
    return err;
  };

  export default ValidateForm;