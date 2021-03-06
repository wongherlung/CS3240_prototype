$(document).ready(function() {

  initUserDefaults();

  initModulesList();
  $(".right-column").stickThis({top:0});
  initCAPWindow();
  capWindowEvents();

  initSuggestionsWindow();

  initCollapsibleContainers();
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

function initRemoveModule() {
  $('.remove-module').click(function(e) {
    e.preventDefault();
    var code = $(this).data('code');
    futureModules[code].expectedGrade = '';
    futureModules[code].year = '';
    futureModules[code].semester = '';
    initModulesList();
  });
}

var shouldCollapse = false;
function initCollapsibleContainers() {
  $('.collapsible').click(function(e) {
    var container = $($(e.currentTarget).siblings()[0]);
    container.toggleClass("collapse");
    var glyph = $(e.currentTarget).children()[0];
    if ($(glyph).hasClass('glyphicon-triangle-bottom')) {
      $(glyph).removeClass('glyphicon-triangle-bottom');
      $(glyph).addClass('glyphicon-triangle-right');
    } else {
      $(glyph).removeClass('glyphicon-triangle-right');
      $(glyph).addClass('glyphicon-triangle-bottom');
    }
  });

  $('.collapse-all').click(function(e) {
    if (shouldCollapse) {
      $('.collapsible-container').addClass('collapse');
      $('.glyphicon').removeClass('glyphicon-triangle-bottom');
      $('.glyphicon').addClass('glyphicon-triangle-right');
      shouldCollapse = false;
    } else {
      $('.collapsible-container').removeClass('collapse');
      $('.glyphicon').removeClass('glyphicon-triangle-right');
      $('.glyphicon').addClass('glyphicon-triangle-bottom');
      shouldCollapse = true;
    }
  });
}

function capWindowEvents() {
  // Show the hidden CAP
  $('.hidden-cap').click(function() {
    $('.hidden-cap').addClass('hidden');
    $('.shown-cap').removeClass('hidden');
  });

  $('.shown-cap').click(function() {
    $('.shown-cap').addClass('hidden');
    $('.hidden-cap').removeClass('hidden');
  });

  $('.js-edit-goal-cap').click(function(e) {
    e.preventDefault();

    $('#edit-goal-cap-modal').on('shown.bs.modal', function () {
      $('#goal-cap-field-1').focus();
      $('#goal-cap-field-1').select();

      $('#goal-cap-field-1').keyup(function(e) {
        if ((e.keyCode >= 48 && e.keyCode <= 53) || (e.keyCode >= 96 && e.keyCode <= 101)) {
          $('#goal-cap-field-2').focus();
          $('#goal-cap-field-2').select();
        } else {
          $(e.target).val('');
        }
      });

      $('#goal-cap-field-2').keyup(function(e) {
        if ($('#goal-cap-field-1').val() == 5) {
          if ((e.keyCode == 48) || (e.keyCode == 96)) {
            $('#goal-cap-field-3').focus();
            $('#goal-cap-field-3').select();
          } else {
            $(e.target).val('');
          }
        } else {
          if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            $('#goal-cap-field-3').focus();
            $('#goal-cap-field-3').select();
          } else {
            $(e.target).val('');
          }
        }
      });

      $('#goal-cap-field-3').keyup(function(e) {
        if ($('#goal-cap-field-1').val() == 5) {
          if ((e.keyCode == 48) || (e.keyCode == 96)) {

          } else {
            $(e.target).val('');
          }
        } else {
          if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {

          } else {
            $(e.target).val('');
          }
        }
      });
    });

    $('#edit-goal-cap-modal').modal();

    // Populate the field in the edit goal CAP modal
    var digits = parseFloat(get('goal_cap')).toFixed(2) + "";
    $('#goal-cap-field-1').val(parseInt(digits[0]));
    $('#goal-cap-field-2').val(parseInt(digits[2]));
    $('#goal-cap-field-3').val(parseInt(digits[3]));

    // In case user makes error and clicks Cancel.
    $('.js-close-cap-modal').click(function() {
      resetGoalCAPValidation();
    });

    // Goal CAP Modal Events
    $('.js-save-goal-cap').click(function() {
      processNewCAPEntered();
    });

    $('.goal-cap-input').keypress(function(e){
      var keycode = (e.keyCode ? e.keyCode : e.which);
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
  var newValue = parseFloat($('#goal-cap-field-1').val() + "." + $('#goal-cap-field-2').val() + "" + $('#goal-cap-field-3').val()).toFixed(2);

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
  $('.suggestion-item-container-location').html('');
  for (var i in futureModules) {
    if (futureModules[i].year == '') {
      generateSuggestion(i);
    }
  }
}

function generateSuggestion(code) {
  var name = modules[code].name;
  var types = modules[code].type;
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
  button.click(function() {
    $('.year3semester2 .chosen-single').css('border-color', '#8CC152');
    $('.year3semester2 .chosen-single').css('border-width', '2px');
    $('#module-select-3-2').val(code+' - '+modules[code].name).trigger("chosen:updated");
    var availableTypes = modules[code].type;
    // Reset the options.
    $('#module-select-type-3-2').html('');
    availableTypes.forEach(function(value) {
      $('#module-select-type-3-2').append('<option value="'+value+'">'+value+'</option>');
    });
    $('#module-select-type-3-2').prop('disabled', false);
    $('#module-select-type-3-2').val('').trigger("chosen:updated");
  });
  $('.suggestion-item-container-location').append(suggestion);
}

function initModulesList() {
  generatePastSemesterTable(1,1);
  generatePastSemesterTable(1,2);
  generatePastSemesterTable(2,1);
  generatePastSemesterTable(2,2);
  generatePastSemesterTable(3,1);
  generateFutureSemsTable(3,2);
  generateFutureSemsTable(4,1);
  generateFutureSemsTable(4,2);

  attachAutoCompleteToSearchModuleInput(3,2);
  attachAutoCompleteToSearchModuleInput(4,1);
  attachAutoCompleteToSearchModuleInput(4,2);

  $('.year3semester2 .chosen-single').css('border-color', '#CCCCCC');
  $('.year3semester2 .chosen-single').css('border-width', '1px');
  initRemoveModule();
}

function generatePastSemesterTable(year, semester) {
  $('.year'+year+'semester'+semester+'-table').html('');
  var pastSemesterTemplate = '';
  pastSemesterTemplate += '<table class="table">';
  pastSemesterTemplate += '<thead>';
  pastSemesterTemplate += '<tr>';
  pastSemesterTemplate += '<td class="module-code-column">Module Code</td>';
  pastSemesterTemplate += '<td class="module-name-column">Name</td>';
  pastSemesterTemplate += '<td align="center">Type</td>';
  // TODO: Insert Tooltip here
  pastSemesterTemplate += '<td align="center">Workload</td>';
  pastSemesterTemplate += '<td align="center">Credits</td>';
  pastSemesterTemplate += '<td align="center">Grade Obtained</td>';
  pastSemesterTemplate += '</tr>';
  pastSemesterTemplate += '</thead>';
  pastSemesterTemplate += '<tbody>';

  for (var moduleCode in pastModules) {
    var pastModule = pastModules[moduleCode];
    if (pastModule.year == year && pastModule.semester == semester && modules[moduleCode]) {
      pastSemesterTemplate += '<tr>';
      pastSemesterTemplate += '<td align="right">'+moduleCode+'</td>';
      pastSemesterTemplate += '<td>'+modules[moduleCode].name+'</td>';
      var type = pastModule.type;
      pastSemesterTemplate += '<td align="center"><span class="label ' + type + ' " style="margin-right: 5px;">' + type + '</span></td>';
      pastSemesterTemplate += '<td align="center">'+modules[moduleCode].workload+'</td>';
      pastSemesterTemplate += '<td align="center">'+modules[moduleCode].credits+'</td>';
      pastSemesterTemplate += '<td align="center">'+pastModule.grade+'</td>';
      pastSemesterTemplate += '</tr>';
    }
  }

  pastSemesterTemplate += '</tbody>';
  pastSemesterTemplate += '</table>';
  $('.year'+year+'semester'+semester+'-table').append(pastSemesterTemplate);
}

function generateFutureSemsTable(year, semester) {
  var totalNumberOfModulesForThisSem = 0;

  $('.year'+year+'semester'+semester+'-table').html('');
  var futureSemesterTemplate = '';
  futureSemesterTemplate += '<table class="table">';
  futureSemesterTemplate += '<thead>';
  futureSemesterTemplate += '<tr>';
  futureSemesterTemplate += '<td class="module-code-column">Module Code</td>';
  futureSemesterTemplate += '<td class="module-name-column">Name</td>';
  futureSemesterTemplate += '<td align="center">Type</td>';
  // TODO: Insert Tooltip here
  futureSemesterTemplate += '<td align="center">Workload</td>';
  futureSemesterTemplate += '<td align="center">Credits</td>';
  futureSemesterTemplate += '<td align="center" style="width: 10%;">Grade to Obtain</td>';
  futureSemesterTemplate += '<td align="center"></td>';
  futureSemesterTemplate += '</tr>';
  futureSemesterTemplate += '</thead>';
  futureSemesterTemplate += '<tbody>';

  var hasAtLeastOneModule = false;
  var hasIneligibleModule = false;

  for (var moduleCode in futureModules) {
    var futureModule = futureModules[moduleCode];
    if (futureModule.year == year && futureModule.semester == semester && modules[moduleCode]) {
      hasAtLeastOneModule = true;
      totalNumberOfModulesForThisSem++;

      if (!futureModule.eligible) {
        hasIneligibleModule = true;
        futureSemesterTemplate += '<tr style="color: #E9573F">';
      } else {
        futureSemesterTemplate += '<tr>';
      }

      futureSemesterTemplate += '<td align="right">'+moduleCode+'</td>';
      futureSemesterTemplate += '<td>'+modules[moduleCode].name+'</td>';
      var type = futureModule.chosenType;
      futureSemesterTemplate += '<td align="center"><span class="label ' + type + ' " style="margin-right: 5px;">' + type + '</span></td>';
      futureSemesterTemplate += '<td align="center">'+modules[moduleCode].workload+'</td>';
      futureSemesterTemplate += '<td align="center">'+modules[moduleCode].credits+'</td>';
      futureSemesterTemplate += '<td align="center">';
      futureSemesterTemplate += '<select class="grade-'+year+'-'+semester+'" data-code="'+moduleCode+'">';
      futureSemesterTemplate += '<option value="">-</option>';
      futureSemesterTemplate += '<option value="A+">A+</option>';
      futureSemesterTemplate += '<option value="A">A</option>';
      futureSemesterTemplate += '<option value="A-">A-</option>';
      futureSemesterTemplate += '<option value="B+">B+</option>';
      futureSemesterTemplate += '<option value="B">B</option>';
      futureSemesterTemplate += '<option value="B-">B-</option>';
      futureSemesterTemplate += '<option value="C+">C+</option>';
      futureSemesterTemplate += '<option value="C">C</option>';
      futureSemesterTemplate += '<option value="D+">D+</option>';
      futureSemesterTemplate += '<option value="D">D</option>';
      futureSemesterTemplate += '</select>';
      futureSemesterTemplate += '</td>';
      futureSemesterTemplate += '<td align="center"><a href="#" style="font-size: 0.8em;" class="remove-module" data-code="'+moduleCode+'">Remove</td>';
      futureSemesterTemplate += '</tr>';
    }
  }

  $('[data-toggle="tooltip"]').tooltip();
  var tooltipMessage = "This is the CAP you will get from achieving these grades above after this semester. You can compare it to your Goal CAP.";

  if (year == 3 && semester == 2) {
    futureSemesterTemplate += '<tr>';
    futureSemesterTemplate += '<td colspan="3"></td>';
    futureSemesterTemplate += '<td class="expected-cap" colspan="4" style="text-align: right;" data-toggle="tooltip" data-placement="top" title="'+tooltipMessage+'">';
    futureSemesterTemplate += 'Expected CAP after this semester: -';
    futureSemesterTemplate += '</td>';
    futureSemesterTemplate += '</tr>';
  }

  if (!hasAtLeastOneModule) {
    return;
  }

  futureSemesterTemplate += '</tbody>';
  futureSemesterTemplate += '</table>';
  $('.year'+year+'semester'+semester+'-table').append(futureSemesterTemplate);


  $('.grade-'+year+'-'+semester).change(function(e) {
    futureModules[$(this).data('code')].expectedGrade = $(this).val();
    if (year == 3 && semester == 2) {
      updateExpectedCAPForThisSem();
    }
  });

  // Update expected grade if there is an expected grade in storage
  for (var moduleCode in futureModules) {
    var futureModule = futureModules[moduleCode];
    if (futureModule.year == year && futureModule.semester == semester && modules[moduleCode]) {
      if (futureModule.expectedGrade) {
        var grades = $('.grade-'+year+'-'+semester);
        for (var i = 0; i < grades.length; i++) {
          var grade = grades[i];
          if ($(grade).data('code') == moduleCode) {
            $(grade).val(futureModule.expectedGrade);
          }
        }
      }
    }
  }

  $('.error-message-box-'+year+'-'+semester).html('');
  if (hasIneligibleModule) {
    $('.error-message-box-'+year+'-'+semester).html("You have selected a module that you are not eligible for.");
  }

  if (year == 3 && semester == 2) {
    updateExpectedCAPForThisSem();
  }

  if (totalNumberOfModulesForThisSem >= 7) {
    $('#module-select-'+year+'-'+semester).prop('disabled', true);
  }
}

function updateExpectedCAPForThisSem() {
  var numberOfModules = 0;
  var totalPointsThisSem = 0;
  for (var code in futureModules) {
    var module = futureModules[code];
    if (module.year == 3 && module.semester == 2) {
      if (getPointFromGrade(module.expectedGrade) != 0) {
        numberOfModules++;
        totalPointsThisSem += getPointFromGrade(module.expectedGrade);
      }
    }
  }
  var expectedCAP = (4 + totalPointsThisSem / numberOfModules) / 2;
  if (isNaN(expectedCAP)) {
    expectedCAP = 4.00;
  }
  $('.expected-cap').html('Expected CAP after this semester: ' + expectedCAP.toFixed(2));
}

function attachAutoCompleteToSearchModuleInput(y, s) {
  var moduleCodes = Object.keys(futureModules);
  moduleCodes = moduleCodes.filter(function(code) {
    return futureModules[code].year == '';
  });
  var values = moduleCodes.map(function(code) {
    return code + ' - ' + modules[code].name;
  });

  $('#module-select-'+y+'-'+s).html('');
  $('#module-select-'+y+'-'+s).append('<option value=""></option>');
  values.forEach(function(value) {
    $('#module-select-'+y+'-'+s).append('<option value="'+value+'">'+value+'</option>');
  });
  $('#module-select-'+y+'-'+s).val('').trigger("chosen:updated");

  $('#module-select-'+y+'-'+s).chosen({'width': '100%', 'white-space': 'nowrap'});
  $('#module-select-'+y+'-'+s).on('change', function(e) {
    var code = $(e.currentTarget).val().split(' - ')[0];
    var availableTypes = modules[code].type;
    // Reset the options.
    $('#module-select-type-'+y+'-'+s).html('');
    availableTypes.forEach(function(value) {
      $('#module-select-type-'+y+'-'+s).append('<option value="'+value+'">'+value+'</option>');
    });
    $('#module-select-type-'+y+'-'+s).prop('disabled', false);
    $('#module-select-type-'+y+'-'+s).val('').trigger("chosen:updated");
  });

  $('#module-select-type-'+y+'-'+s).chosen({'width': '100%', 'white-space': 'nowrap'});

  $('#module-select-type-'+y+'-'+s).on('change', function() {
    $('.js-new-module-'+y+'-'+s).prop('disabled', false);
  });

  $('.js-new-module-'+y+'-'+s).click(function(e) {
    var code = $('#module-select-'+y+'-'+s).val().split(' - ')[0];
    var type = $('#module-select-type-'+y+'-'+s).val();
    if (code && type) {
      var year = $(this).data('year');
      var semester = $(this).data('semester');

      futureModules[code].year = year;
      futureModules[code].semester = semester;
      futureModules[code].chosenType = type;
      $('#module-select-type-'+y+'-'+s).prop('disabled', true);
      $('.js-new-module-'+y+'-'+s).prop('disabled', true);
      $('#module-select-'+y+'-'+s).val('').trigger("chosen:updated");
      $('#module-select-type-'+y+'-'+s).val('').trigger("chosen:updated");
      initModulesList();
      initSuggestionsWindow();
    }
  });
}

function getPointFromGrade(grade) {
  switch (grade) {
    case 'A+':
      return 5;
    case 'A':
      return 5;
    case 'A-':
      return 4.5;
    case 'B+':
      return 4;
    case 'B':
      return 3.5;
    case 'B-':
      return 3;
    case 'C+':
      return 3.5;
    case 'C':
      return 2;
    case 'D+':
      return 1.5;
    case 'D':
      return 1;
    default:
      return 0
  }
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

var futureModules = {
  "CS5321": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": true
  },
  "CS5331": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": true
  },
  "IS4231": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": true
  },
  "IS4232": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": true
  },
  "ACC1002": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": false
  },
  "ACC1006": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": false
  },
  "CG1108": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": false
  },
  "CG2023": {
    "chosenType": "",
    "expectedGrade": "",
    "year": "",
    "semester": "",
    "eligible": false
  }
};