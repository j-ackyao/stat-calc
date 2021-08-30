function ztest() {
    var hyp = document.getElementById("hyp").value;
    var sd = document.getElementById("sd").value;
    var mean = document.getElementById("mean").value;
    var size = document.getElementById("size").value;
    var ah = document.getElementsByName("ah");
    var alt_hyp = "";

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
        document.getElementById("warning").innerHTML += "null hypothesis is negative <br/>";
        error = true;
    }

    if (sd == "") {
        document.getElementById("warning").innerHTML += "standard deviation is empty <br/>";
        error = true;
    }
    else if (sd <= 0) {
        document.getElementById("warning").innerHTML += "standard deviation is negative <br/>";
        error = true;
    }

    if (mean == "") {
        document.getElementById("warning").innerHTML += "mean is empty <br/>";
        error = true;
    }
    else if (mean <= 0) {
        document.getElementById("warning").innerHTML += "mean is negative <br/>";
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
            document.getElementById("warning").innerHTML += "sample size is negative <br/>";
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
            pvalue = normalcdf(teststat) * 2;
        }
        else if (alt_hyp == "lt") {
            pvalue = normalcdf(teststat);
        }
        else if (alt_hyp == "gt") {
            pvalue = 1-normalcdf(teststat);
        }


    }

    document.getElementById("teststat").innerHTML = teststat;
    document.getElementById("pvalue").innerHTML = pvalue;
}