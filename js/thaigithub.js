function callAPI(){

  $.getJSON('https://api.github.com/search/users?q=location:Thailand+sort:followers&per_page=100', function(data) {
    alert(typeof data);
    //var json = JSON.parse(data);
    alert(data.total_count);


    var html = '<ul>';
    $.each(data.items, function(i,item){

      html += '<a href="'+item.html_url+'">'
                + '<li><img src="'+item.avatar_url+'" width="64" height="64" style="display:inline;margin:0;float:left;"/>'
                + '<span style="font-weight:bold;">'+(i+1)+'. '+item.login+'</span><br/></li></a>';
    });
    html+='</ul>';

    $("#container").html(html);

  });

}


window.onload = callAPI();
