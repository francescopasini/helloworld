function priceFunc(coupon,faceValue,T,ytm)
{
	return coupon * (1-Math.pow(1+ytm,-T))/ytm + faceValue * Math.pow(1+ytm,-T);
}

function recalculate(what)
{
	what = what || "ytm";
	var faceValue  = document.bondCalc.faceValue.value;
	var couponRate = document.bondCalc.couponRate.value/100;
	var T		   = document.bondCalc.timeToMaturity.value;
	var coupon     = couponRate * faceValue;

	if(what=="price")
	{
		var ytm = document.bondCalc.ytm.value/100;
		var price = priceFunc(coupon,faceValue,T,ytm);
		document.bondCalc.price.value = Math.round(price*1e3)/1e3;
	}
	else
	{
		var price = document.bondCalc.price.value;
		var ytm = couponRate;
		var bump = 0.0001;
		for(iter=0;iter<200;iter++)
		{
			f = priceFunc(coupon,faceValue,T,ytm)-price;
			if(Math.abs(f)<1e-3)
				break;
			f_hi = priceFunc(coupon,faceValue,T,ytm+bump)-price;
			f_prime = (f_hi-f)/bump;

			ytm = ytm - f/f_prime;
		}
		document.bondCalc.ytm.value = Math.round(ytm*1e5)/1e3;
	}
}