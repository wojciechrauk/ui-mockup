$(function() {
    var orderId =1;
    var orderIdSpan = $('#order-id-span');
    $('#done-button').click(function(){
      orderId ++;
      orderIdSpan.html(orderId);
    });
});