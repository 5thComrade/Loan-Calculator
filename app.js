document.querySelector('#loan-form').addEventListener('submit', function(e) {
    //Hide Results
    document.getElementById('results').style.display = 'none';
    //Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults() {
    const UIamount = document.getElementById('amount');
    const UIrate = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');
    
    const principle = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIrate.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //Show Results
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers...');
    }
}

function showError(error) {
    const errorDiv = document.createElement('div');
    
    //Add Bootstrap Class
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('#error');
    if(card.childElementCount === 0) {
        card.appendChild(errorDiv);
        document.getElementById('loading').style.display = 'none';
    }

    //Clear Error
    setTimeout(function() {
        card.children[0].remove();
    }, 2000);
}