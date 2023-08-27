function ztest() {
    const hyp = document.getElementById("hyp").value;
    const sd = document.getElementById("sd").value;
    const mean = document.getElementById("mean").value;
    const size = document.getElementById("size").value;
    const ah = document.getElementsByName("ah");
    const alt_hyp = "";

    var teststat = "";
    var pvalue = "";

    for (var i = 0; i < 3; i++) {
        if (ah[i].checked) {
            alt_hyp = ah[i].value;
            break;
        }
    }

    var error = false;

    document.getElementById("warning").innerHTML = "";
    if (hyp == "") {
        document.getElementById("warning").innerHTML += "null hypothesis is empty <br/>";
        error = true;
    }
    else if (hyp <= 0) {
        document.getElementById("warning").innerHTML += "null hypothesis is invalid <br/>";
        error = true;
    }

    if (sd == "") {
        document.getElementById("warning").innerHTML += "standard deviation of sample is empty <br/>";
        error = true;
    }
    else if (sd <= 0) {
        document.getElementById("warning").innerHTML += "standard deviation of sample is invalid <br/>";
        error = true;
    }

    if (mean == "") {
        document.getElementById("warning").innerHTML += "mean is empty <br/>";
        error = true;
    }
    else if (mean <= 0) {
        document.getElementById("warning").innerHTML += "mean is invalid <br/>";
        error = true;
    }

    if (size == "") {
        document.getElementById("warning").innerHTML += "sample size is empty <br/>";
        error = true;
    }
    else {
        if (size != Math.round(size)) {
            document.getElementById("warning").innerHTML += "sample size is not an integer <br/>";
            error = true;
        }
        if (size <= 0) {
            document.getElementById("warning").innerHTML += "sample size is invalid <br/>";
            error = true;
        }
    }

    if (alt_hyp == "") {
        document.getElementById("warning").innerHTML += "alternative hypothesis not selected <br/>";
        error = true;
    }

    if (!error) {
        teststat = (mean - hyp) / (sd / Math.sqrt(size));

        if (alt_hyp == "ne") {
            if (teststat > 0) {
                pvalue = (1 - normalcdf(teststat)) * 2;
            }
            else {
                pvalue = (normalcdf(teststat)) * 2;
            }
        }
        else if (alt_hyp == "lt") {
            pvalue = normalcdf(teststat);
        }
        else if (alt_hyp == "gt") {
            pvalue = 1 - normalcdf(teststat);
        }
        pvalue = Math.round(pvalue * Math.pow(10, 8)) / Math.pow(10, 8);
    }

    document.getElementById("teststat").innerHTML = teststat;
    document.getElementById("pvalue").innerHTML = pvalue;
}