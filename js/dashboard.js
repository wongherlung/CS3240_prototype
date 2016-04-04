$(document).ready(function() {

  initUserDefaults();

  initModulesList();

  initCAPWindow();
  capWindowEvents();

  initSuggestionsWindow();
});

function get(key) {
  return localStorage.getItem(key);
}

function set(key, value) {
  localStorage.setItem(key, value);
}

function initUserDefaults() {
  localStorage.setItem('goal_cap', 4.30);
}

function initCAPWindow() {
  $('.js-goal-cap-value').html(parseFloat(get('goal_cap')).toFixed(2));
}

function capWindowEvents() {
  // Show the hidden CAP
  $('#hidden-cap').click(function() {
    this.remove();
    $('.js-current-cap').html('4.00');
  });

  $('#js-edit-goal-cap').click(function(e) {
    e.preventDefault();

    $('#edit-goal-cap-modal').modal();

    // Populate the field in the edit goal CAP modal
    $('.goal-cap-input').val(parseFloat(get('goal_cap')).toFixed(2));

    // In case user makes error and clicks Cancel.
    $('.js-close-cap-modal').click(function() {
      resetGoalCAPValidation();
    });

    // Goal CAP Modal Events
    $('.js-save-goal-cap').click(function() {
      processNewCAPEntered();
    });

    $('.goal-cap-input').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        processNewCAPEntered();
      }
    });
  });
}

function resetGoalCAPValidation() {
  $('.error-message-box').html('');
  $('.goal-cap-form-group').removeClass('has-error');
}

function processNewCAPEntered() {
  var newValue = $('.goal-cap-input').val();

  // Validation check for Goal CAP
  if (isNaN(newValue) || parseFloat(newValue) < 0 || parseFloat(newValue) > 5) {
    $('.goal-cap-form-group').addClass('has-error');
    if ($('.error-message-box').html() === '') {
      $('.error-message-box').html('<span style="font-size: 0.75em; color: #DA4453;">Please enter in a valid CAP.</span>');
    }
  } else {
    set('goal_cap', parseFloat(newValue).toFixed(2));
    resetGoalCAPValidation();
    $('#edit-goal-cap-modal').modal('hide');

    // Refresh goal cap number in view
    initCAPWindow();
  }
}

function initSuggestionsWindow() {
  for (var i in modules) {
    var module = modules[i];
    generateSuggestion(i, module.name, module.type);
  }
}

function generateSuggestion(code, name, types) {
  var suggestion = $($('.suggestion-item-template').html());
  suggestion.removeClass('hidden');
  var elements = $(suggestion.children()[0]);
  var button = $($(suggestion.children()[1]).children()[0]);
  var moduleCode = $(elements.children()[0]);
  var moduleType = $(elements.children()[1]);
  var moduleName = $(elements.children()[2]);
  moduleCode.html(code);
  for (var i in types) {
    var type = types[i];
    moduleType.append('<span class="label ' + type + ' " style="margin-right: 5px;">' + type + '</span>');
  }
  moduleName.html(name);
  button.attr('data-code', code);
  $('.suggestion-item-container-location').append(suggestion);
}

function initModulesList() {
  generateTable(1,1);
  generateTable(1,2);
  generateTable(2,1);
  generateTable(2,2);
  generateTable(3,1);
}

function generateTable(year, semester) {
  var pastSemesterTemplate = '';
  pastSemesterTemplate += '<table class="table">';
  pastSemesterTemplate += '<thead>';
  pastSemesterTemplate += '<tr>';
  pastSemesterTemplate += '<td>Module Code</td>';
  pastSemesterTemplate += '<td>Name</td>';
  pastSemesterTemplate += '<td>Type</td>';
  // TODO: Insert Tooltip here
  pastSemesterTemplate += '<td>Workload</td>';
  pastSemesterTemplate += '<td>Credits</td>';
  pastSemesterTemplate += '<td>Grade Obtained</td>';
  pastSemesterTemplate += '</tr>';
  pastSemesterTemplate += '</thead>';
  pastSemesterTemplate += '<tbody>';

  for (var moduleCode in pastModules) {
    var pastModule = pastModules[moduleCode];
    if (pastModule.year == year && pastModule.semester == semester && modules[moduleCode]) {
      pastSemesterTemplate += '<tr>';
      pastSemesterTemplate += '<td>'+moduleCode+'</td>';
      pastSemesterTemplate += '<td>'+modules[moduleCode].name+'</td>';
      var type = pastModule.type;
      pastSemesterTemplate += '<td><span class="label ' + type + ' " style="margin-right: 5px;">' + type + '</span></td>';
      pastSemesterTemplate += '<td>'+modules[moduleCode].workload+'</td>';
      pastSemesterTemplate += '<td>'+modules[moduleCode].credits+'</td>';
      pastSemesterTemplate += '<td>'+pastModule.grade+'</td>';
      pastSemesterTemplate += '</tr>';
    }
  }

  pastSemesterTemplate += '</tbody>';
  pastSemesterTemplate += '</table>';
  $('.year'+year+'semester'+semester).append(pastSemesterTemplate);
}

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
  }
};