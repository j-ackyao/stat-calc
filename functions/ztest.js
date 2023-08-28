const ROUND_DIGITS = 6;


function ztestmean() {
    const hyp = document.getElementById("hyp_mean").value;
    const sd = document.getElementById("sd_mean").value;
    const mean = document.getElementById("mean_mean").value;
    const size = document.getElementById("size_mean").value;
    const alt_hyp = document.getElementById("ah_mean").value;
    const sl = document.getElementById("sl_mean").value;
    const shade = document.getElementById("shade_mean").value;


    var teststat = "";
    var pvalue = "";


    var error = false;

    document.getElementById("warning_mean").innerHTML = "";
    if (hyp == "") {
        document.getElementById("warning_mean").innerHTML += "null hypothesis is empty <br/>";
        error = true;
    }

    if (sd == "") {
        document.getElementById("warning_mean").innerHTML += "standard deviation is empty <br/>";
        error = true;
    }
    else if (sd <= 0) {
        document.getElementById("warning_mean").innerHTML += "standard deviation is invalid <br/>";
        error = true;
    }

    if (mean == "") {
        document.getElementById("warning_mean").innerHTML += "mean is empty <br/>";
        error = true;
    }

    if (size == "") {
        document.getElementById("warning_mean").innerHTML += "sample size is empty <br/>";
        error = true;
    }
    else {
        if (size != Math.round(size)) {
            document.getElementById("warning_mean").innerHTML += "sample size is not an integer <br/>";
            error = true;
        }
        if (size <= 0) {
            document.getElementById("warning_mean").innerHTML += "sample size is invalid <br/>";
            error = true;
        }
    }
    if (sl == "") {
        document.getElementById("warning_mean").innerHTML += "significance level is empty <br/>";
        error = true;
    }
    else if (sl < 0 || sl > 1) {
        document.getElementById("warning_mean").innerHTML += "significance level is invalid <br/>";
        error = true;
    }       
    if (error) {
        return;
    }

    teststat = (mean - hyp) / (sd / Math.sqrt(size));

    if (alt_hyp == "ne") {
        if (teststat > 0) {
            pvalue = (1 - normcdf(teststat)) * 2;
        }
        else {
            pvalue = (normcdf(teststat)) * 2;
        }
    }
    else if (alt_hyp == "lt") {
        pvalue = normcdf(teststat);
    }
    else if (alt_hyp == "gt") {
        pvalue = 1 - normcdf(teststat);
    }
    pvalue = Math.round(pvalue * Math.pow(10, ROUND_DIGITS)) / Math.pow(10, ROUND_DIGITS);

    if (pvalue < sl) {
        document.getElementById("conclusion_mean").innerHTML = "reject the null hypothesis";
    } else {
        document.getElementById("conclusion_mean").innerHTML = "failed to reject the null hypothesis";
    }

    document.getElementById("teststat_mean").innerHTML = teststat;
    document.getElementById("pvalue_mean").innerHTML = pvalue;
    document.getElementById("typei_mean").innerHTML = sl;

    typeii = "";

    if (alt_hyp == "ne") {
        if (teststat > 0) {
            typeii = normcdf(((-normq(Number(sl) / 2) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
            typeii -= normcdf(((normq(Number(sl) / 2) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
        }
        else {
            typeii = 1 - normcdf(((normq(Number(sl) / 2) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
            typeii -= 1 - normcdf(((-normq(Number(sl) / 2) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
        }
    }
    else if (alt_hyp == "lt") {
        typeii = 1 - normcdf(((normq(Number(sl)) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
    }
    else if (alt_hyp == "gt") {
        typeii = normcdf(((-normq(Number(sl)) * Number(sd) / Math.sqrt(size)) + Number(hyp) - Number(mean)) / (Number(sd) / Math.sqrt(size)));
    }
    typeii = Math.round(typeii * Math.pow(10, ROUND_DIGITS)) / Math.pow(10, ROUND_DIGITS);

    document.getElementById("typeii_mean").innerHTML = typeii;

    var canvas = document.getElementById("mean_model");
    drawmodels(canvas, teststat, alt_hyp, shade, sl);
}


function ztestprop() {
    const hyp = document.getElementById("hyp_prop").value;
    const mean = document.getElementById("mean_prop").value;
    const size = document.getElementById("size_prop").value;
    const alt_hyp = document.getElementById("ah_prop").value;
    const sl = document.getElementById("sl_prop").value;
    const shade = document.getElementById("shade_prop").value;


    var teststat = "";
    var pvalue = "";


    var error = false;

    document.getElementById("warning_prop").innerHTML = "";
    if (hyp == "") {
        document.getElementById("warning_prop").innerHTML += "null hypothesis is empty <br/>";
        error = true;
    }
    else if (hyp <= 0 || hyp >= 1) {
        document.getElementById("warning_prop").innerHTML += "null hypothesis is invalid <br/>";
        error = true;
    }


    if (mean == "") {
        document.getElementById("warning_prop").innerHTML += "mean is empty <br/>";
        error = true;
    }
    else if (mean <= 0) {
        document.getElementById("warning_prop").innerHTML += "mean is invalid <br/>";
        error = true;
    }

    if (size == "") {
        document.getElementById("warning_prop").innerHTML += "sample size is empty <br/>";
        error = true;
    }
    else {
        if (size != Math.round(size)) {
            document.getElementById("warning_prop").innerHTML += "sample size is not an integer <br/>";
            error = true;
        }
        if (size <= 0) {
            document.getElementById("warning_prop").innerHTML += "sample size is invalid <br/>";
            error = true;
        }
    }
    if (sl == "") {
        document.getElementById("warning_prop").innerHTML += "significance level is empty <br/>";
        error = true;
    }
    else if (sl < 0 || sl > 1) {
        document.getElementById("warning_prop").innerHTML += "significance level is invalid <br/>";
        error = true;
    }    


    if (error) {
        return;
    }


    var sd = Math.sqrt(hyp * (1 - hyp) / size)
    teststat = (mean - hyp) / sd;

    if (alt_hyp == "ne") {
        if (teststat > 0) {
            pvalue = (1 - normcdf(teststat)) * 2;
        }
        else {
            pvalue = (normcdf(teststat)) * 2;
        }
    }
    else if (alt_hyp == "lt") {
        pvalue = normcdf(teststat);
    }
    else if (alt_hyp == "gt") {
        pvalue = 1 - normcdf(teststat);
    }
    pvalue = Math.round(pvalue * Math.pow(10, ROUND_DIGITS)) / Math.pow(10, ROUND_DIGITS);

    if (pvalue < sl) {
        document.getElementById("conclusion_prop").innerHTML = "reject the null hypothesis";
    } else {
        document.getElementById("conclusion_prop").innerHTML = "failed to reject the null hypothesis";
    }

    document.getElementById("teststat_prop").innerHTML = teststat;
    document.getElementById("pvalue_prop").innerHTML = pvalue;
    document.getElementById("typei_prop").innerHTML = sl;

    typeii = "";

    if (alt_hyp == "ne") {
        if (teststat > 0) {
            typeii = normcdf(((-normq(Number(sl) / 2) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
            typeii -= normcdf(((normq(Number(sl) / 2) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
        }
        else {
            typeii = 1 - normcdf(((normq(Number(sl) / 2) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
            typeii -= 1 - normcdf(((-normq(Number(sl) / 2) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
        }
    }
    else if (alt_hyp == "lt") {
        typeii = 1 - normcdf(((normq(Number(sl)) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
    }
    else if (alt_hyp == "gt") {
        typeii = normcdf(((-normq(Number(sl)) * Number(sd)) + Number(hyp) - Number(mean)) / (Number(sd)));
    }
    typeii = Math.round(typeii * Math.pow(10, ROUND_DIGITS)) / Math.pow(10, ROUND_DIGITS);
    document.getElementById("typeii_prop").innerHTML = typeii;


    var canvas = document.getElementById("prop_model");
    drawmodels(canvas, teststat, alt_hyp, shade, sl);
}