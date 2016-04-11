
$(document).ready(function() {
  $('#submit-review-btn').click(function(){
    $('#create-review-modal').modal('hide');
    var successText = 'Your review has been submitted! <br>You can now search for reviews by selecting the module in search bar above. Or you can click below button to create more reviews.</br>'
    $('#warning-text').html(successText);
    $('#module-review-select').prop('disabled', false);
    $('#search-review-btn').prop('disabled', false);
    $('#main-review-box').css('border-top-color', '#F6BB42');
})
  
  $('#search-review-btn').click(function(){
    $('#sem-taken-filter').prop('disabled', false);
    $('#diff-filter').prop('disabled', false);
    $('#recommendation-filter').prop('disabled', false);
    $('#apply-filter-btn').prop('disabled', false);
    var input = $('#module-review-select').val();
    generateReview(input);
})

function generateReview(code) {
    $('.warning-text-container').css('padding-left', '50px');
    $('.warning-text-container').css('padding-right', '50px');
    $('#warning-text').remove();
    $('#show-modal-btn').remove();
    if($('#review-header').length){
        $('#review-header').remove();
    }
    $('#main-review-box').append('<h3 id="review-header">Review(s) for '+code+'</h3>');
    var reviewTemplate = '';
    reviewTemplate += '<table class="table">';
    
    var tempcode = reviews[code];
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">Matric No. :</td>';
    reviewTemplate += '<td align="left">'+tempcode.matric+'</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">Sem taken :</td>';
    reviewTemplate += '<td align="left">'+tempcode.sem+'</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">Difficulty :</td>';
    reviewTemplate += '<td align="left">'+tempcode.difficulty+'</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">Rating :</td>';
    reviewTemplate += '<td align="left">'+tempcode.recommendation+'</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">Comment :</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '</table>';
    reviewTemplate += '<table>';
    reviewTemplate += '<tr>';
    reviewTemplate += '<td align="left">'+tempcode.comment+'</td>';
    reviewTemplate += '</tr>';
    reviewTemplate += '</table>';
    $('#main-review-box').append(reviewTemplate);
}

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

  $('#show-modal-btn').click(function() {
    $('#create-review-modal').modal('show');
  });
});

var reviews = {
    "CS1231": {
        "matric": "A0098103J",
        "sem": "2",
        "difficulty": "3 - Moderate",
        "recommendation": "4 - Recommended",
        "comment": "This module is very fun and not that difficult compared to other CS modules. The lecturer is very fun although sometimes he could give us challenging problems. All in all, this module is recommended to take!"
    },
    "IS4221": {
        "matric": "A0098103J",
        "sem": "1",
        "difficulty": "4 - Somewhat Difficult",
        "recommendation": "2 - Not Recommended",
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