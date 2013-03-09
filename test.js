var count = 0;
$("#276100_5").bind('touchstart click', function(){
  count++;
  if (count %2 == 0) { //count 2% gives the remaining counts when devided by 2
    alert("yeap");
  }

  return false
});
