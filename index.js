let equal_pressed = 0;

$(document).ready(function() {
  let $input = $("#dispaly");
  let $buttonInput = $(".input-button");
  let $equal = $("#equal");
  let $clear = $("#clear");
  let $erase = $("#erase");

  $input.val("");

  $buttonInput.on("click", function() {
    if (equal_pressed == 1) {
      $input.val("");
      equal_pressed = 0;
    }
    $input.val($input.val() + $(this).val());
  });

  $equal.on("click", function() {
    equal_pressed = 1;
    let inp_val = $input.val();
    try {
      let solution = eval(inp_val);

      if (Number.isInteger(solution)) {
        $input.val(solution);
      } else {
        $input.val(solution.toFixed(2));
      }
    } catch (err) {
      alert("Invalid Input");
    }
  });

  $clear.on("click", function() {
    $input.val("");
  });

  $erase.on("click", function() {
    $input.val($input.val().substr(0, $input.val().length - 1));
  });
});
