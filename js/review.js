
$(document).ready(function() {
    // list of modules for search reviews
    var moduleCodes = Object.keys(modules);
    var values = moduleCodes.map(function(code) {
        return code + ' - ' + modules[code].name;
    });

    $('#module-review-select').html('');
    $('#module-review-select').append('<option value=""></option>');
    values.forEach(function(value) {
        $('#module-review-select').append('<option value="'+value+'">'+value+'</option>');
    });
    $('#module-review-select').chosen({'width': '100%', 'white-space': 'nowrap'});

    // list of past modules for create new review
    var pastModuleCodes = Object.keys(pastModules);
    var pastValues = pastModuleCodes.map(function(code){
        return code;
    });
   
    $('#select-module-for-review').html('');
    $('#select-module-for-review').append('<option value=""></option>');
    pastValues.forEach(function(pastValue) {
        $('#select-module-for-review').append('<option value="'+pastValue+'">'+pastValue+'</option>');
    });
    $('#select-module-for-review').chosen({'width': '100%', 'white-space': 'nowrap'});

});

$('#show-modal-btn').click(function() {
    $('#create-review-modal').modal('show');
});

$('#submit-review-btn').click(function(){
    $('#create-review-modal').modal('hide');
    var successText = 'Your review has been submitted! <br>You can now search for reviews by selecting the module in search bar above. Or you can click below button to create more reviews.</br>'
    $('#warning-text').html(successText);
    $('#module-review-select').prop('disabled', false);
    $('#module-review-select').trigger("chosen:updated");
    $('#search-review-btn').prop('disabled', false);
    $('#main-review-box').css('border-top-color', '#F6BB42');
})
  
$('#search-review-btn').click(function(){
    $('#sem-taken-filter').prop('disabled', false);
    $('#diff-filter').prop('disabled', false);
    $('#recommendation-filter').prop('disabled', false);
    $('#apply-filter-btn').prop('disabled', false);
    
    var input = $('#module-review-select').val();
    input = input.substr(0, input.indexOf('-'));
    input = input.trim();
    generateReview(input);
})

function generateReview(code) {
    $('#warning-text').html('');
    //$('#show-modal-btn').remove();
    
    $('#review-header').html('Review(s) for '+code);
    $('.list-of-reviews').html('');
    
    var reviewTemplate = '';
    var found = false;
    for(var cd in reviews){
        if(code==cd){
            found = true;
            var tempcode = reviews[code];
            
            for(var i=0; i<tempcode.length; i++){
                var diff = tempcode[i].difficulty;
                var recom = tempcode[i].recommendation;
                reviewTemplate += '<div class="row review-item">';
                reviewTemplate += '<div class="col-md-3">';
                reviewTemplate += '<p id="matric">'+tempcode[i].matric+'</p>';
                reviewTemplate += '<p>AY '+tempcode[i].ay +' semester '+tempcode[i].sem+'</p>';
                reviewTemplate += '<div class="col-md-6" id="diff-box-'+i+'">';
                reviewTemplate += '<p>Difficulty:</p>';
                reviewTemplate += '<p>'+tempcode[i].difficulty+'</p>';
                reviewTemplate += '</div>';
                reviewTemplate += '<div class="col-md-6" id="rec-box-'+i+'">';
                reviewTemplate += '<p>Likes:</p>';
                reviewTemplate += '<p>'+tempcode[i].recommendation+'</p>';
                reviewTemplate += '</div>';
                reviewTemplate += '</div>';
                reviewTemplate += '<div class="col-md-9">';
                reviewTemplate += '<p>'+tempcode[i].comment+'</p>';
                reviewTemplate += '</div></div>';
            }
        }
    }
    if(!found){
        $('#warning-text').html('No review has been made for this module.');
    }
    $('.list-of-reviews').append(reviewTemplate);
}

var reviews = {
    "CS1231": [
        {"matric": "A0098103J",
        "ay": "2012/2013",
        "sem": "2",
        "difficulty": "Moderate",
        "recommendation": "Recommended",
        "comment": "This module is very fun and not that difficult compared to other CS modules. The lecturer is very fun although sometimes he could give us challenging problems. All in all, this module is recommended to take!"
        },
        {"matric": "A0102867U",
        "ay": "2014/2015",
        "sem": "2",
        "difficulty": "Moderate",
        "recommendation": "Neutral",
        "comment": "Simply math, no coding, for those who love math might be happy to take this mod."
        },
    ],    
    "IS4221": {
        "matric": "A0098103J",
        "ay": "2014/2015",
        "sem": "1",
        "difficulty": "Somewhat Difficult",
        "recommendation": "Not Recommended",
        "comment": "Lecturer is very lousy. Don't take this unless you really don't have other mods to take!!!!"
    }
}


var modules = {
  "CS1101S": {
    "name": "Programming Methodology",
    "type": ["Core"],
    "credits": 5,
    "workload": "5-4-3-2-4"
  },
  "CS1231": {
    "name": "Discrete Structures",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "MA1521": {
    "name": "Calculus for Computing",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "MA1101R": {
    "name": "Linear Algebra",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "TR2201": {
    "name": "Entreprenuerial Marketing",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "LSM1302": {
    "name": "Genes and Society",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "ST2334": {
    "name": "Probability and Statistics",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "IS1103": {
    "name": "Computing and Society",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2020": {
    "name": "Data Structures and Algorithm (Advanced)",
    "type": ["Core"],
    "credits": 6,
    "workload": "5-4-3-2-4"
  },
  "CS2100": {
    "name": "Computer Organization",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2101": {
    "name": "Effective Communication for Computing Professionals",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2103T": {
    "name": "Software Engineering",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3216": {
    "name": "Software Development on Evolving Platforms",
    "type": ["Core"],
    "credits": 5,
    "workload": "5-4-3-2-4"
  },
  "CS2102": {
    "name": "Database Systems",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2105": {
    "name": "Introduction to Computer Networks",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2106": {
    "name": "Introduction to Operating Systems",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS2107": {
    "name": "Information Security",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3230": {
    "name": "Design and Analysis of Algorithms",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "LSM1303": {
    "name": "Animal Behavior",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3235": {
    "name": "Introduction to Computer Security",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3103": {
    "name": "Computer Networks and Protocols",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "LSM1301": {
    "name": "General Biology",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "GEK1520": {
    "name": "Understanding the Universe",
    "type": ["GEM", "UE"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS4236": {
    "name": "Cryptography Theory and Practice",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3217": {
    "name": "Software Engineering on Modern Application Platforms",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS3240": {
    "name": "Interaction Design",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "GEK1001": {
    "name": "Geographical Journeys: Exploring World Environments",
    "type": ["GEM", "UE"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS4238": {
    "name": "Computer Security Practice",
    "type": ["Core"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS5321": {
    "name": "Network Security",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CS5331": {
    "name": "Web Security",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "IS4231": {
    "name": "Information Security Management",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "IS4232": {
    "name": "Topics in Information Security",
    "type": ["Core", "UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "ACC1002": {
    "name": "Financial Accounting",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "ACC1006": {
    "name": "Accounting Information Systems",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CG1108": {
    "name": "Electrical Engineering",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  },
  "CG2023": {
    "name": "Signals and System",
    "type": ["UE", "Breadth"],
    "credits": 4,
    "workload": "5-4-3-2-4"
  }
};

var pastModules = {
  "CS1101S": {
    "year": 1,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS1231": {
    "year": 1,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "MA1521": {
    "year": 1,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "MA1101R": {
    "year": 1,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "TR2201": {
    "year": 1,
    "semester": 1,
    "type": "UE",
    "grade": "A"
  },
  "LSM1302": {
    "year": 1,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "ST2334": {
    "year": 1,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "IS1103": {
    "year": 1,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS2020": {
    "year": 1,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS2100": {
    "year": 2,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS2101": {
    "year": 2,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS2103T": {
    "year": 2,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS3216": {
    "year": 2,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS2103": {
    "year": 2,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS2102": {
    "year": 2,
    "semester": 1,
    "type": "Breadth",
    "grade": "A"
  },
  "CS2105": {
    "year": 2,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS2106": {
    "year": 2,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS2107": {
    "year": 2,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS3230": {
    "year": 2,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "LSM1303": {
    "year": 2,
    "semester": 2,
    "type": "Core",
    "grade": "A"
  },
  "CS3103": {
    "year": 3,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "LSM1301": {
    "year": 3,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "GEK1520": {
    "year": 3,
    "semester": 1,
    "type": "GEM",
    "grade": "A"
  },
  "CS4238": {
    "year": 3,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  },
  "CS3235": {
    "year": 3,
    "semester": 1,
    "type": "Core",
    "grade": "A"
  }
};
