// ------------------------------------- school details ---------------------------

// -------------------------------------- end -------------------------------------

//  ------------------------------------ noc details functionality -----------------
function noc() {
    var noc = [];
    var noc_authority = $('#noc_authority').val();
    var noc_state = $('#noc_state').val();
    // alert(noc_state);
    if (noc_state == '' || noc_authority == '') {
        noc.push('noc');
    }

    console.log(noc);

    if (noc.length == 0) {
        $('#nocd').show();
    } else {
        $('#nocd').hide();
    }
}

function nocAjax() {

    var noc_authority = $('#noc_authority').val();
    var noc_state = $('#noc_state').val();
    var noc_date = $('#noc_date').val();
    var nochid = $('#nocHid').val();
    var noc = [];

    if (noc_state == '' || noc_authority == '') {
        noc.push('noc');
    }

    if (noc.length == 0) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'post',
            url: '/noc_details',
            data: { noc_authority: noc_authority, noc_state: noc_state, noc_date: noc_date, nochid: nochid },
            success: function (data) {
                $('#trustId').val(data.result);

                console.log(data)
            }
        });
    } else {
        $('#noc_details').html('');
    }
}


// -------------------------------------- noc details end ----------------------------

//  ------------------------------------ trust/company details functionality -----------------
function trustDetails() {
    var trust = [];
    var ownership_type = $('#ownership_type').val();

    if (ownership_type == 3) {
        var cin_no = $('#cin_no').val();
        // alert(cin_no);
        if (cin_no == '' || cin_no.length < 21) {
            trust.push('trust');
        }
    } else {
        $('#cin_no').val('');
    }
    // alert(noc_state);
    if (ownership_type == '') {
        trust.push('trust');
    }

    console.log(trust);

    if (trust.length == 0) {
        $('#trustDetail').show();
    } else {
        $('#trustDetail').hide();
    }
}
// ------------------------------- ajax ----------------------------------

$(document).ready(function () {
    $('#trustDetail').on('click', 'button', function () {
        var formData = {
            ownership_type: $('#ownership_type').val(),
            registration_date: $('#registration_date').val(),
            owner_name: $('#owner_name').val(),
            registration_no: $('#registration_no').val(),
            date_of_estd: $('#date_of_estd').val(),
            cin_no: $('#cin_no').val(),
            trustId: $('#trustId').val()
        };

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            type: 'POST',
            url: 'trust_details', // Replace with your route
            data: formData,
            dataType: 'json',
            success: function (data) {
                // Handle success response
                console.log('Success:', data);
                $('#landCertiId').val(data.result);
                // Optionally, you can redirect or show a success message
            },
            error: function (xhr, status, error) {
                // Handle error response
                console.error('Error:', error);
            }
        });
    });
});;

//  ------------------------------------- end ajax ---------------------------

// -------------------------------------- trust/company details end ----------------------------
// -----------------toggle next button with single/multiple radio button----------
function toggleButtonWithPlots() {
    $('#certi_land').toggle();
}
// -------------------------- end ---------------------------------------




// --------------------------------------------------------------------------------------------









