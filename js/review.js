
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
    $('#select-module-for-review').val(''); //still error
    $('#lecturer').val('');
    $("#rate-difficulty").val('');
    $("#rate-recommendation").val('');
    $("#comment").val('');
    $(".select-mod-review").removeClass("has-error");
    $('.input-lecturer').removeClass("has-error");
    $(".rate-diff").removeClass("has-error");
    $(".rate-rec").removeClass("has-error");
     $(".input-comment").removeClass("has-error");
    $(".error-text").html('');
    $('#create-review-modal').modal('show');
    
});

$('#submit-review-btn').click(function(){
    var mod = $("#select-module-for-review").val();
    var lecturer = $('#lecturer').val();
    var diff = $("#rate-difficulty").val();
    var rec = $("#rate-recommendation").val();
    var comment = $("#comment").val();
    
    if(mod=='' || lecturer=='' || diff=='' || rec=='' || comment==''){
        $(".error-text").append("<p>Please fill in the required fields!</p>");
        if(mod == ''){
            $(".select-mod-review").addClass("has-error"); //doesnt appear
        }
        if(lecturer==''){
            $('.input-lecturer').addClass("has-error");
        }
        if(diff==''){
            $(".rate-diff").addClass("has-error");
        }
        if(rec==''){
            $(".rate-rec").addClass("has-error");
        }
        if(comment==''){
            $(".input-comment").addClass("has-error");
        }
    } else {
        $('#create-review-modal').modal('hide');
        var successText = 'Your review has been submitted! <br>You can now search for reviews by selecting the module in search bar above. Or you can click below button to create more reviews.</br>'
        $('#warning-text').html(successText);
        $('#module-review-select').prop('disabled', false);
        $('#module-review-select').trigger("chosen:updated");
        $('#search-review-btn').prop('disabled', false);
        $('#main-review-box').css('border-top-color', '#F6BB42');
    }
});

$('#search-review-btn').click(function(){
    $('#sem-taken-filter').prop('disabled', false);
    $('#diff-filter').prop('disabled', false);
    $('#recommendation-filter').prop('disabled', false);
    $('#apply-filter-btn').prop('disabled', false);
    
    var input = $('#module-review-select').val();
    input = input.substr(0, input.indexOf('-'));
    input = input.trim();
    generateReview(input);
});

$('#apply-filter-btn').click(function(){
    var semester = $('#sem-taken-filter').val();
    var diff = $('#diff-filter').val();
    var rating = $('#recommendation-filter').val();
    
    var listLength = $('#review-list li').length;
    var semFilter = false;
    var diffFilter = false;
    var recFilter = false;
    
    for(var i=0; i<listLength; i++){
        $('#review-item-'+i).removeClass('hide');
    }
    
    if(semester!=''){
        semFilter = true;
    }
    if(diff!=''){
        diffFilter = true;
    }
    if(rating!=''){
        recFilter = true;
    }
    
    if(semFilter || diffFilter || recFilter){
        for(var i=0; i<listLength; i++){
            if(semFilter){
                var thisSem = $('#sem-'+i).text();
                thisSem = thisSem.substring(22,23);
                if(thisSem!=semester){
                    $('#review-item-'+i).addClass('hide');
                }
            }
            if(diffFilter){
                var thisDiff = $('#diff-'+i).text(); 
                if(thisDiff!=diff){
                    $('#review-item-'+i).addClass('hide');
                }
            }
            if(recFilter){
                var thisRec = $('#recom-'+i).text();
                if(thisRec!=rating){
                    $('#review-item-'+i).addClass('hide');
                }
            }
        }
    }
    
});

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
            reviewTemplate += '<ul id="review-list">';
            
            for(var i=0; i<tempcode.length; i++){
                var diff = tempcode[i].difficulty;
                var recom = tempcode[i].recommendation;
                reviewTemplate += '<li>';
                reviewTemplate += '<div class="row review-item" id="review-item-'+i+'">';
                reviewTemplate += '<div class="col-md-3">';
                reviewTemplate += '<p id="matric">'+tempcode[i].matric+'</p>';
                reviewTemplate += '<p id="sem-'+i+'">AY '+tempcode[i].ay +' semester '+tempcode[i].sem+'</p>';
                reviewTemplate += '<p>Lecturer : '+tempcode[i].lecturer+'</p>';
                reviewTemplate += '<div class="col-md-6">';
                reviewTemplate += '<p>Difficulty:</p>';
                reviewTemplate += '<p id="diff-'+i+'">'+tempcode[i].difficulty+'</p>';
                reviewTemplate += '</div>';
                reviewTemplate += '<div class="col-md-6">';
                reviewTemplate += '<p>Rating:</p>';
                reviewTemplate += '<p id="recom-'+i+'">'+tempcode[i].recommendation+'</p>';
                reviewTemplate += '</div>';
                reviewTemplate += '</div>';
                reviewTemplate += '<div class="col-md-9">';
                reviewTemplate += '<p>'+tempcode[i].comment+'</p>';
                reviewTemplate += '</div></div></li>';
            }
            
            reviewTemplate += '</ul>';
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
        "lecturer": "Chan Mun Choon",
        "sem": "2",
        "difficulty": "Moderate",
        "recommendation": "Recommended",
        "comment": "This module is very fun and not that difficult compared to other CS modules. The lecturer is very fun although sometimes he could give us challenging problems. All in all, this module is recommended to take!"
        },
        {"matric": "A0102867U",
        "ay": "2014/2015",
        "lecturer": "Chan Mun Choon",
        "sem": "2",
        "difficulty": "Moderate",
        "recommendation": "Neutral",
        "comment": "Simply math, no coding, for those who love math might be happy to take this mod."
        },
    ],    
    "IS4231": [
        {"matric": "A0098103J",
        "ay": "2014/2015",
        "lecturer": "Prof X",
        "sem": "1",
        "difficulty": "Somewhat Difficult",
        "recommendation": "Not Recommended",
        "comment": "Lecturer is very lousy. Don't take this unless you really don't have other mods to take!!!!"
        },
        {"matric": "A0102873L",
        "ay": "2013/2014",
        "lecturer": "Prof Y",
        "sem": "1",
        "difficulty": "Moderate",
        "recommendation": "Neutral",
        "comment": "Not a good module. Most of the topics are textbook-material and not much "
        },
    ],
    "MA1521": [
        {"matric": "A0102367U",
        "ay": "2011/2012",
        "lecturer": "Wang Fei",
        "sem": "1",
        "difficulty": "Somewhat Difficult",
        "recommendation": "Neutral",
        "comment": "Even though the title is Calculus for Computing, there is nothing to do with computing. Don't be fooled! This is just simply calculus. My lecturer was Wang Fei and he loves to give tricky and challenging questions. But, overall his grading is quite lenient."
        },
        {"matric": "A0176342S",
        "ay": "2012/2013",
        "lecturer": "Wang Fei",
        "sem": "2",
        "difficulty": "Somewhat Easy",
        "recommendation": "Recommended",
        "comment": "I love math. This module is awesome!"
        },
        {"matric": "A0092348L",
        "ay": "2013/2014",
        "lecturer": "Wang Fei",
        "sem": "1",
        "difficulty": "Moderate",
        "recommendation": "Neutral",
        "comment": "All math and calculus. Not related to computing and coding st all. Prof Wang Fei is very talented in teaching even though he likes to give tricky problems."
        }
    ]
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
