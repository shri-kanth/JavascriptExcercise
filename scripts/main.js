var first = true;
var covered = false;
var max_x,min_x;
var max_y,min_y;
var c;
var r = 20;
var del = false;
var circle;

window.onload = function() {
	circle = confirm("Choose   'OK' 	for Circle cover\nChoose 'Cancel' for Square cover");
}

var pointd = function(event) 
{
	var Mx = false,My = false, Mnx = false,Mny = false;
	if(event.target === max_x)
		Mx = true;
	if(event.target === min_x)
		Mnx = true;
	if(event.target === max_y)
		My = true;
	if(event.target === min_y)
		Mny = true;
	document.body.removeChild(event.target);
	del = true;
	
	var points = document.getElementsByClassName("point");
	if(points.length === 0)
         {first = true;
		return;}
	
	if(Mx)
          	findMaxX();
        if(Mnx)
		findMinX();
        if(My)
		findMaxY();		
	if(Mny) 
		findMinY();
		
        adjustCover();

}

var point = function(event) 
{
	if(del)
	{
		del = false;
		return;
	}
	var x = event.clientX;
	var y = event.clientY;
	var d = document.createElement("div");
        var p = document.createAttribute("class");
        p.value = "point";
	d.setAttributeNode(p);
	var p2 = document.createAttribute("onclick");
        p2.value = "pointd(event)";
	d.setAttributeNode(p2);
	d.style.top = y-(r/2)+"px";
	d.style.left = x-(r/2)+"px";
	document.body.appendChild(d);
	 if(first)
		{
                 first = false;
                 max_x = d;
                 min_x = d;
                 max_y = d;
                 min_y = d;
                }
	else
	    {	
                if(parseInt(max_x.style.left) < x)
			{max_x = d; adjustCover();}
		if(parseInt(min_x.style.left) > x)
			{min_x = d; adjustCover();}
		
                if(parseInt(max_y.style.top) < y)
			{max_y = d; adjustCover();}
		if(parseInt(min_y.style.top) > y)
			{min_y = d; adjustCover();}
	}
	
}

var adjustCover = function()
{
	if(!covered)
	{
	  var at = document.createAttribute("id");
          at.value = "cover";
	  c = document.createElement("div");
          c.setAttributeNode(at);
	  if(circle)
		c.style.borderRadius = 100+"%";
          document.body.appendChild(c);
	  covered = true;
	}
	else
	{
	  c = document.getElementById("cover");
	}
	var points = document.getElementsByClassName("point");
	if(points.length === 1)
		{document.body.removeChild(c);
		 covered = false;
		 return;}
		
	var ch = ((parseInt(max_x.style.left)-parseInt(min_x.style.left)) > (parseInt(max_y.style.top)-parseInt(min_y.style.top)));

		if(ch)
		{
                  var centerX = (parseInt(max_x.style.left)+parseInt(min_x.style.left))/2;
                  var centerY = (parseInt(max_y.style.top)+parseInt(min_y.style.top))/2;
                  var side = (parseInt(max_x.style.left)-parseInt(min_x.style.left));
		  c.style.height = (side+r)+"px";
		  c.style.width = (side+r)+"px";
		  c.style.left = min_x.style.left;
                  c.style.top = centerY-(side/2)+"px";
		}
		else
                {
		  var centerX = (parseInt(max_x.style.left)+parseInt(min_x.style.left))/2;
                  var centerY = (parseInt(max_y.style.top)+parseInt(min_y.style.top))/2;
                  var side = (parseInt(max_y.style.top)-parseInt(min_y.style.top));
		  c.style.height = (side+r)+"px";
		  c.style.width = (side+r)+"px";
		  c.style.left = centerX-(side/2)+"px";
                  c.style.top = min_y.style.top;
                }
            
}

var findMaxX = function()
{	
	var points = document.getElementsByClassName("point");
	max_x = points[0];
	for(var i = 0; i < points.length; i++)
	   { 
	    if(parseInt(max_x.style.left) < parseInt(points[i].style.left))
		max_x = points[i];
           }
}

var findMinX = function()
{
	var points = document.getElementsByClassName("point");
	min_x = points[0];
	for(var i = 0; i < points.length; i++)
	   { 
	    if(parseInt(min_x.style.left) > parseInt(points[i].style.left))
		min_x = points[i];
           }
}

var findMaxY = function()
{
	var points = document.getElementsByClassName("point");
	max_y = points[0];
	for(var i = 0; i < points.length; i++)
	   { 
	    if(parseInt(max_y.style.top) < parseInt(points[i].style.top))
		max_y = points[i];
           }
}

var findMinY = function()
{
	var points = document.getElementsByClassName("point");
	min_y = points[0];
	for(var i = 0; i < points.length; i++)
	   { 
	    if(parseInt(min_y.style.top) > parseInt(points[i].style.top))
		min_y = points[i];
           }
}
