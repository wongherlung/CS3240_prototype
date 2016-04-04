$(document).ready(function() {

  initUserDefaults();

  initCAPWindow();
  capWindowEvents();

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
  $('#hidden-cap').click(function() {
    this.remove();
    $('.js-current-cap').html('4.00');
  });

  $('#js-edit-goal-cap').click(function(e) {
    e.preventDefault();

    $('#edit-goal-cap-modal').modal();

    $('.goal-cap-input').val(parseFloat(get('goal_cap')).toFixed(2));

    $('.js-close-cap-modal').click(function() {
      resetGoalCAPValidation();
    });

    // Goal CAP Modal Events
    $('.js-save-goal-cap').click(function() {
      var newValue = $('.goal-cap-input').val();

      // Validation check for Goal CAP
      if (isNaN(newValue) || parseFloat(newValue) < 0
        || parseFloat(newValue) > 5) {
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
    });
  });
}

function resetGoalCAPValidation() {
  $('.error-message-box').html('');
  $('.goal-cap-form-group').removeClass('has-error');
}