// -------------------------------------- certificate of land functionality --------------------
$('#rented_id').on('click', function () {
    // alert('hi');
    $('.single_leese').show();
    // $('#getleaedeed').show();

});
$('#owned_plot_id').on('click', function () {
    // alert('hi');
    $('.single_leese').hide();
    // $('#getleaedeed').hide();

});

function singRenewClasue(x) {
    if (x == 'y') {
        $('#sduofleasedeed').show();
    } else {
        $('#sduofleasedeed').hide();
    }

}


function chngLeasedeed(i, x) {
    // alert(x);
    if (x == 'l') {
        $('#leasDeeds' + i).removeClass('renewalFormhide');
        $('#leasDiv' + i).removeClass('renewalFormhide');
        $('#durLesdt' + i).removeClass('renewalFormhide');
        $('#regLesdt' + i).removeClass('renewalFormhide');
        $('#regLesofc' + i).removeClass('renewalFormhide');
        $('#type_of_deeds' + i).show();
        $('#type_of_deedssg' + i).hide();
        $('#mrenew' + i).removeClass('renewalFormhide');

    } else {
        $('#leasDeeds' + i).addClass('renewalFormhide');
        $('#leasDiv' + i).addClass('renewalFormhide');
        $('#durLesdt' + i).addClass('renewalFormhide');
        $('#regLesdt' + i).addClass('renewalFormhide');
        $('#regLesofc' + i).addClass('renewalFormhide');
        $('#type_of_deeds' + i).hide();
        $('#type_of_deedssg' + i).show();
        $('#mrenew' + i).addClass('renewalFormhide');
    }
}

function renewalClasue(i, y) {

    if (y == 'y') {
        $('#renewalDur' + i).show();
    } else {
        $('#renewalDur' + i).hide();
    }


}
function toggleButtonWithPlots() {
    $('#certi_land').toggle();
}
// ------------------Function to create a new div structure-----------
var no_of_plots_arr = 0;
function createNewDiv() {

    var totalDiv = $('#no_of_plots').val();
    // Allow only numbers (0-9) in the input field
    var numbers = /^[0-9]+$/;
    if (!totalDiv.match(numbers)) {
        // evt.preventDefault();
        $('#errnoplot').html('Input should be numeric.');
        $('#errnoplot').show();
        return false;
    }
    else if (totalDiv < 2) {
        $('#errnoplot').html('No. of plots should be greater than 1');
        $('#errnoplot').show();
        $('#multiPlotDetails').html('');
        return false;
    } else {
        $('#errnoplot').html('');
        $('#errnoplot').hide();
    }
    no_of_plots_arr = totalDiv;
    // var totalDiv = total - 1;
    // var htmlContent = $('.details').html();
    $('#multiPlotDetails').html('');
    // alert(totalDiv);

    for (let i = 1; i <= totalDiv; i++) {

        let sectionHtml = `
            <div class="col-12 hidden-section details border" style="margin-top:20px;">
                <div class="box-shadow-card row plots">
                    <p class="font-18 text-color-3B3B3B mb-1 mt-2"><u>Owner's Details (<span id="plot_no${i}">plot ${i}</span>)</u></p>
                    <div class="col-lg-4">
                        <div class="mb-2">
                            <p class="mb-0 font-14" style="color:#3B3B3B ">Type of Land
                            </p>

                            <input type="radio" name="ownerPlot${i}" value="single" id="owned_plot_id${i}"
                                class="ms-2"  onclick="chngLeasedeed(${i},'o')"/><span class="text-color-3B3B3B font-14 ms-1"> Owned </span>


                            <input type="radio" name="ownerPlot${i}" value="multiple" id="rented_id${i}"
                                class="ms-2" onclick="chngLeasedeed(${i},'l')" />
                            <span class="text-color-3B3B3B font-14 ms-1">Leased
                            </span>

                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Land Area *</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="land_area${i}" onkeyup="dynamicFieldvalidation()">
                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Land Owned by</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="owned_by${i}">
                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Executed by (Name of seller)</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="executed_by${i}">
                        </div>

                        <div class="mb-3 renewal_clause" id="distP${i}" style="display:none;">
                            <label for="simpleinput" class="form-label">Distance of Plot ${i} from Plot 1</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="dist_of_plot${i}">
                        </div>
                    </div>
                    <div class="col-lg-4 formTags">
                          <div style="height:55px;"></div>
                        <div class="mb-3">
                            <label for="example-select" class="form-label">Situated In *</label>
                            <select class="form-select form-select-sm border-dark" id="land_title_doc${i}">
                                <option value="1">Plot No(s)</option>
                                <option value="2">Survey No(s)</option>
                                <option value="3">Khasra No(s)</option>

                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="example-select" class="form-label">Land Title Documentation in Terms of</label>
                            <select class="form-select form-select-sm border-dark" id="land_title_doc${i}">
                                <option selected>Types of deeds</option>
                            <option value="1">Sale Deed</option>
                            <option value="2">Lease Deed</option>
                            <option value="3">Conveyance Deed</option>
                            <option value="4">Gift Deed</option>

                            </select>
                        </div>

                        <div class="mb-3" id="registration_office_details${i}">
                            <label for="simpleinput" class="form-label">Details of registered office</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="regid_ofc_details${i}" value="">
                        </div>

                    </div>
                    <div class="col-lg-4" style="margin-top:51px">
                        <div style="height:4px;"></div>
                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Situated At<span class="font-10"> (street/village,Sub Division,District,State)</span></label>
                            <input type="text" class="form-control form-control-sm border-dark" id="situated_at${i}">
                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Date of Land Title Document</label>
                            <input type="date" class="form-control form-control-sm border-dark" id="land_title_date${i}">
                        </div>

                        <div class="mb-3">
                            <label for="simpleinput" class="form-label">Details of Land Title Document</label>
                            <input type="text" class="form-control form-control-sm border-dark" id="land_title${i}">
                        </div>
                    </div>

                    <p class="font-18 text-color-3B3B3B mb-0 mt-1 renewalFormhide" id="leasDeeds${i}">Lease Deeds Details</p>
                    <div class="col-lg-12 row renewalFormhide" id="leasDiv${i}">
                        <div class="col-lg-4">

                            <div class="mb-3">
                                <label for="simpleinput" class="form-label">Land Area *</label>
                                <input type="text" class="form-control form-control-sm border-dark" id="land_title${i}">
                            </div>

                        </div>
                        <div class="col-lg-4">

                            <div class="mb-3">
                                <label for="simpleinput" class="form-label">Name of the Lessee *</label>
                                <input type="text" class="form-control form-control-sm border-dark" id="lease_name${i}">
                            </div>

                        </div>
                        <div class="col-lg-4">

                            <div class="mb-3">
                                <label for="simpleinput" class="form-label">Date of Lease Deed *</label>
                                <input type="date" class="form-control form-control-sm border-dark" id="lease_deed_date${i}" onchange="dynamicFieldvalidation()">
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-12 row">
                        <div class="col-lg-4">

                            <div class="mb-3 renewalFormhide" id="durLesdt${i}">
                                <label for="simpleinput" class="form-label">Duration of Lease deed</label>
                                <input type="text" class="form-control form-control-sm border-dark" id="lease_date_dur${i}">
                            </div>
                            <div class="mb-2 renewalFormhide" id="mrenew${i}">
                                <p class="mb-0 font-14" style="color:#3B3B3B ">Is there any renewal Clause in the leese deed?</p>
                                <input type="radio" name="Renewal${i}" value="single" id="renewal_yes${i}" class="ms-0" onclick="renewalClasue(${i},'y')"/><span class="text-color-3B3B3B font-14 ms-1"> Yes </span>
                                <input type="radio" name="Renewal${i}" value="multiple" id="Renewal_no${i}" class="ms-2" onclick="renewalClasue(${i},'n')"/>
                                <span class="text-color-3B3B3B font-14 ms-1">No</span>
                            </div>
                        </div>
                        <div class="col-lg-4 renewalFormhide" id="regLesdt${i}">

                            <div class="mb-3">
                                <label for="simpleinput" class="form-label">Date of Registration of lease Deed *</label>
                                <input type="date" class="form-control form-control-sm border-dark" id="date_regis_lease_deed${i}" onchange="dynamicFieldvalidation()">
                            </div>
                        </div>
                        <div class="col-lg-4 renewalFormhide" id="regLesofc${i}">

                            <div class="mb-3">
                                <label for="simpleinput" class="form-label">Details of Registration Office *</label>
                                <input type="text" class="form-control form-control-sm border-dark" id="details_regis_ofc${i}" onchange="dynamicFieldvalidation()">
                            </div>
                        </div>
                        <div class="col-lg-12 row" id="renewalDur${i}" style="display:none;">
                                <div class="col-lg-4">



                                    <div class="mb-3">
                                        <label for="simpleinput" class="form-label">Duration of renewal of lease deed *</label>
                                        <input type="text" class="form-control-sm form-control border-dark" id="dur_lease_deeds${i}" onkeyup="validateland()">
                                    </div>

                                </div>


                            </div>
                    </div>
                </div>
            </div>
            <br>
        `;


        // Append the generated section to the container
        $('#multiPlotDetails').append(sectionHtml);

        if (i == 1) {
            $('#distP1').removeClass('renewal_clause');
            $('#distP1').remove();
        }
    }
    // alert(totalDiv

}

$('#renewal_yes').on('click', function () {
    $('.renewal_clause').addClass('renewalFormhide');

});
$('#renewal_no').on('click', function () {
    $('.renewal_clause').show();
    $('.renewal_clause').removeClass('renewalFormhide');
});

// -------------- validation----------------

function validateland() {

    var school_name = $('#cschool_name').val();
    // var school_address = $('#school_address').val();
    var singlePlot = $('input[name="plotType"]:checked').val();
    console.log(singlePlot);
    // var multiplePlot = $('#multiplePlot').val();

    if (singlePlot == 1) {
        var landCetificates = [];
        var sland_area = $('#sland_area').val();
        var ssituated = $('#ssituated').val();

        if (school_name == '') {
            landCetificates.push('School Name');
        }
        if (sland_area == '') {
            landCetificates.push('Sland area');
        }
        if (ssituated == '') {
            landCetificates.push('SSituated');
        }

        console.log(landCetificates);
        if (landCetificates.length == 0) {
            $('#certi_land').show();
        } else {
            $('#certi_land').hide();
        }
    }





}

var count = [];
function dynamicFieldvalidation() {
    var landCetificates = [];
    var multiplePlot = $('input[name="plotType"]:checked').val();
    var contiguousPlot = $('input[name="plotTypeyes"]:checked').val();
    var no_of_plots = $('#no_of_plots').val();
    if (no_of_plots == '') {
        landCetificates.push('no_of_plots');
    }
    if (multiplePlot == 2) {
        var no_of_plots = no_of_plots_arr;

        for (i = 1; i <= no_of_plots; i++) {
            var land_area = $('#land_area' + i).val();
            var situated_in = $('#situated_in' + i).val();
            var lease_deeds = $('#lease_deeds' + i).val();
            var lease_name = $('#lease_name' + i).val();
            var lease_deed_date = $('#lease_deed_date' + i).val();

            if (contiguousPlot == 'single') {
                var date_regis_lease_deed = $('#date_regis_lease_deed' + i).val();
                var details_regis_ofc = $('#details_regis_ofc' + i).val();

                if (date_regis_lease_deed == '') {
                    landCetificates.push('date_regis_lease_deed' + i);
                }
                if (details_regis_ofc == '') {
                    landCetificates.push('details_regis_ofc' + i);
                }
            }
            if (land_area == '') {
                landCetificates.push('land_area' + i);
            }
            if (situated_in == '') {
                landCetificates.push('situated_in' + i);
            }
            if (lease_deeds == '') {
                landCetificates.push('lease_deeds' + i);
            }
            if (lease_name == '') {
                landCetificates.push('lease_name' + i);
            }
            if (lease_deed_date == '') {
                landCetificates.push('lease_deed_date' + i);
            }
        }

        console.log(landCetificates);
        if (landCetificates.length == 0) {
            $('#certi_land').show();
        } else {
            $('#certi_land').hide();
        }
    }

}

// -----------------------------------------
//  ----------------------- ajax -----------------------
function submitLandCertificate() {
    // Prepare an object to store all field values
    var formData = {};
    var plotNo = $("#no_of_plots").val();
    // Gather values from various input fields
    formData["landCertiId"] = $("#landCertiId").val();
    formData["school_name"] = $("#cschool_name").val();
    formData["school_address"] = $("#school_address").val();

    // Gather radio button values
    formData["plotType"] = $("input[name='plotType']:checked").val();
    formData["ownerplot"] = $("input[name='ownerplot']:checked").val();
    formData["no_of_plots"] = plotNo;
    // formData["mownerPlot"] = $("input[name='mownerPlot']:checked").val();
    if (formData["plotType"] == 1) {
        // Gather values from other input fields
        formData["sland_area"] = $("#sland_area").val();
        formData["sland_owned"] = $("#sland_owned").val();
        formData["sexecuted_by"] = $("#sexecuted_by").val();
        formData["ssituated"] = $("#ssituated").val();
        formData["sland_title_doc"] = $("#sland_title_doc").val();
        formData["sdate_of_regi"] = $("#sdate_of_regi").val();
        formData["ssituated_at"] = $("#ssituated_at").val();
        formData["sdate_land_title"] = $("#sdate_land_title").val();
        formData["sdetails_of_reg_ofc"] = $("#sdetails_of_reg_ofc").val();
    }

    if (formData["plotType"] == 2) {
        for (i = 1; i <= plotNo; i++) {
            formData["ownerPlot" + i] = $("input[name='ownerPlot'" + i + "]:checked").val();
            formData["plotTypeyes" + i] = $("input[name='plotTypeyes'" + i + "]:checked").val();
            // Gather values from multiplot details section
            formData["land_area" + i] = $("#land_area" + i).val();
            formData["owned_by" + i] = $("#owned_by" + i).val();
            formData["executed_by" + i] = $("#executed_by" + i).val();
            formData["registration_office_details" + i] = $("#registration_office_details" + i).val();
            formData["type_of_deeds" + i] = $("#type_of_deeds" + i).val();
            formData["situated_in" + i] = $("#situated_in" + i).val();
            formData["land_title_doc" + i] = $("#land_title_doc" + i).val();
            formData["dist_of_plot" + i] = $("#dist_of_plot" + i).val();
            formData["situated_at" + i] = $("#situated_at" + i).val();
            formData["land_title_date" + i] = $("#land_title_date" + i).val();
            formData["land_title" + i] = $("#land_title" + i).val();

            // Additional fields from lease deeds section
            formData["lease_deeds" + i] = $("#lease_deeds" + i).val();
            formData["lease_name" + i] = $("#lease_name" + i).val();
            formData["lease_deed_date" + i] = $("#lease_deed_date" + i).val();
            formData["lease_date_dur" + i] = $("#lease_date_dur" + i).val();
            formData["lease_renewal_yes" + i] = $("#lease_renewal_yes" + i).val();
            formData["lease_renewal_no" + i] = $("#lease_renewal_no" + i).val();
            formData["date_regis_lease_deed" + i] = $("#date_regis_lease_deed" + i).val();
            formData["details_regis_ofc" + i] = $("#details_regis_ofc" + i).val();
        }
    }

    // Perform AJAX request to send formData
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: 'submit_land_certifcate',  // Replace with your backend endpoint URL
        type: 'POST',
        data: formData,
        success: function (response) {
            // Handle success response
            console.log('Data sent successfully');
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error sending data:', error);
        }
    });
}

// -----------------------------------------------------
// ---------------------------------------- end ------------------------------------------------
// -------------------------------- upload documents ------------------------------------------

function UploadDocuments() {
    var school_details_id = $('#docs_id').val();
    var msgToCouncil = $('#msgToCouncil').val();

    if (msgToCouncil == '') {
        $('#err_msg_council').show();
        return false;
    }

    if (!$('#verify').is(':checked')) {
        $('#err_verify').show();
        return false;
    }


    //    --------------------------- check if all files uploaded or not --------------

    $.ajax({
        type: 'GET',
        url: 'check_all_files_uploaded/' + school_details_id, // Replace with your route
        dataType: 'json',
        success: function (data) {
            // Handle success response
            var result = data.result;
            console.log('Success:', result);

            if (result || result.length > 0) {

                if (result.company_doc == '' || result.company_doc == null) {

                    $('#err_trust').show();
                }
                if (result.land_certificate == '' || result.land_certificate == null) {
                    $('#err_land').show();
                }
                if (result.noc == '' || result.noc == null) {
                    $('#err_noc').show();
                }
                if (result.ownership_docs == '' || result.ownership_docs == null) {
                    $('#err_owner').show();
                }

                // $('#errorModal').modal('show');
                return false;
            }
            // Optionally, you can redirect or show a success message
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error('Error:', error);
        }
    });
    // --------------------------------------end---------------------------------
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: 'submit-message', // Replace with your route
        data: { schoolId: school_details_id, message: msgToCouncil },
        dataType: 'json',
        success: function (data) {
            // Handle success response
            console.log('Success:', data);
            if (data.message == 'sucessfull updated' && data.status == 1) {
                window.location.href = 'a.php';
            }
            // Optionally, you can redirect or show a success message
        },
        error: function (xhr, status, error) {
            // Handle error response
            console.error('Error:', error);
        }
    });


}



